library(dplyr)
library(readr)
library(rstatix)

# Load data 
session <- read_csv("../SessionData-2.csv", show_col_types = FALSE)
survey  <- read_delim("../csv 3/dataset.csv", delim = ";", show_col_types = FALSE)

# Merge & filter 
merged <- session |>
  inner_join(survey, by = c("user" = "id")) |>
  mutate(createdAt_parsed = as.POSIXct(createdAt, format = "%a %b %d %Y %H:%M:%S", tz = "UTC")) |>
  filter(createdAt_parsed >= as.POSIXct("2026-04-04 00:00:01", tz = "UTC")) |>
  filter(variant != "null") |>
  mutate(
    variant = factor(variant),
    s1 = factor(ifelse(accessType1 == "regular", "success", "fail"), levels = c("success", "fail")),
    s2 = factor(ifelse(accessType2 == "panic",   "success", "fail"), levels = c("success", "fail"))
  )

#  Scenario 1: Regular authentication 
cat("  FISHER'S EXACT: variant vs Regular authentication\n")

tbl1 <- table(Variant = merged$variant, Outcome = merged$s1)
print(tbl1)

set.seed(42)
result1 <- fisher_test(tbl1, simulate.p.value = TRUE)
print(result1)
cat(sprintf("  Cramér's V: %.3f\n", cramer_v(tbl1)))

if (result1$p < 0.05) {
  cat("\n  POST-HOC PAIRWISE (Bonferroni):\n")
  set.seed(42)
  print(pairwise_fisher_test(tbl1, p.adjust.method = "bonferroni", simulate.p.value = TRUE))
} else {
  cat("\nScenario 1: Overall test non-significant — post-hoc not warranted.\n")
}

# Scenario 2: Duress authentication
cat("  FISHER'S EXACT: variant vs Duress authentication\n")

tbl2 <- table(Variant = merged$variant, Outcome = merged$s2)
print(tbl2)

set.seed(42)
result2 <- fisher_test(tbl2, simulate.p.value = TRUE)
print(result2)
cat(sprintf("  Cramér's V: %.3f\n", cramer_v(tbl2)))

if (result2$p < 0.05) {
  cat("\n  POST-HOC PAIRWISE (Bonferroni):\n")
  set.seed(42)
  print(pairwise_fisher_test(tbl2, p.adjust.method = "bonferroni", simulate.p.value = TRUE))
} else {
  cat("\nScenario 2: Overall test non-significant — post-hoc not warranted.\n")
}
