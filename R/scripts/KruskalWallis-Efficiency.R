library(dplyr)
library(readr)
library(rstatix)
library(NSM3)   # Steel-Dwass (pSDCFlig)

#  Load data 
session    <- read_csv("../SessionData-2.csv", show_col_types = FALSE)
survey     <- read_delim("../csv 3/dataset.csv",   delim = ";", show_col_types = FALSE)
labels     <- read_delim("../csv 3/labels.csv",    delim = ";", col_names = c("variable", "value", "label"), show_col_types = FALSE)
structure  <- read_delim("../csv 3/structure.csv", delim = ";", show_col_types = FALSE)
vars_meta  <- read_delim("../csv 3/variables.csv", delim = ";", show_col_types = FALSE)

#  Merge & filter 
merged <- session |>
  inner_join(survey, by = c("user" = "id"))

dropped_session <- nrow(anti_join(session, survey,  by = c("user" = "id")))
dropped_survey  <- nrow(anti_join(survey,  session, by = c("id" = "user")))

cutoff <- as.POSIXct("2026-04-04 00:00:01", tz = "UTC")
merged <- merged |>
  mutate(createdAt_parsed = as.POSIXct(createdAt, format = "%a %b %d %Y %H:%M:%S", tz = "UTC")) |>
  filter(createdAt_parsed >= cutoff)

cat("Rows in session:                             ", nrow(session), "\n")
cat("Rows in survey:                              ", nrow(survey),  "\n")
cat("Rows after join:                             ", nrow(merged),  "\n")
cat("Columns in merged dataset:                   ", ncol(merged),  "\n")
cat("Dropped (in SessionData but not in survey):  ", dropped_session, "\n")
cat("Dropped (in survey but not in SessionData):  ", dropped_survey,  "\n")
cat("Dropped (before 2026-04-04 00:00:01 UTC):    ", nrow(inner_join(session, survey, by = c("user" = "id"))) - nrow(merged), "\n")

merged <- merged |>
  filter(variant != "null") |>
  mutate(
    across(c(instructionsTime, panelTime1, panelTime2), as.numeric),
    variant = factor(variant)
  )

#  Kruskal-Wallis tests 
test_vars <- c("instructionsTime", "panelTime1", "panelTime2")

kw_rows <- lapply(test_vars, function(v) {
  res <- kruskal_test(merged, as.formula(paste(v, "~ variant")))
  n   <- sum(!is.na(merged[[v]]))
  eps <- as.numeric(res$statistic) / (n - 1)  # ε² = H / (n - 1)

  cat(sprintf("  KRUSKAL-WALLIS: %s ~ variant\n", v))
  print(res)
  cat(sprintf("  Epsilon-squared (ε²): %.3f\n", eps))

  tibble(
    Variable           = v,
    Test               = "Kruskal-Wallis",
    `Test statistic`   = sprintf("H(%d) = %.3f", res$df, round(as.numeric(res$statistic), 3)),
    `p-value`          = ifelse(res$p < .001, "< .001", sub("0\\.", ".", sprintf("%.3f", res$p))),
    `Effect size (ε²)` = sprintf("%.3f", eps)
  )
})

#  Summary table 
kw_table <- bind_rows(kw_rows)

cat("  KRUSKAL-WALLIS RESULTS SUMMARY (Time Variables)\n")
print(kw_table, n = Inf)

write_csv(kw_table, "kruskal_wallis_results_time.csv")
cat("\nSaved: kruskal_wallis_results_time.csv\n")

#  Post-hoc: Steel-Dwass 
for (v in test_vars) {
  x   <- as.numeric(merged[[v]])
  grp <- factor(merged$variant)
  ok  <- !is.na(x)

  cat(sprintf("  STEEL-DWASS POST-HOC: %s\n", v))
  print(pSDCFlig(x[ok], grp[ok], method = "Asymptotic"))
}
