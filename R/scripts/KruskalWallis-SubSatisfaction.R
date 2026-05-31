library(dplyr)
library(readr)
library(rstatix)

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
  mutate(variant = factor(variant))

#  UEQ scale transformation (-3 to +3 via value - 4)
perspicuity_items   <- c("s_30", "s_31", "s_32", "s_33")
dependability_items <- c("s_21", "s_34", "s_23", "s_26")

merged <- merged |>
  mutate(
    across(all_of(c(perspicuity_items, dependability_items)), as.numeric),
    s_30 = 8 - s_30,  # reverse-coded: understandable(1) to not understandable(7)
    across(all_of(c(perspicuity_items, dependability_items)), ~ .x - 4),
    perspicuity   = rowMeans(across(all_of(perspicuity_items)),   na.rm = TRUE),
    dependability = rowMeans(across(all_of(dependability_items)), na.rm = TRUE)
  )

#  TOAST scale means per participant (scale: 1–7) 
understandability_items <- c("s_1", "s_3", "s_4", "s_8")
performance_items       <- c("s_2", "s_5", "s_6", "s_7", "s_9")

merged <- merged |>
  mutate(
    across(all_of(c(understandability_items, performance_items)), as.numeric),
    understandability = rowMeans(across(all_of(understandability_items)), na.rm = TRUE),
    performance       = rowMeans(across(all_of(performance_items)),       na.rm = TRUE),
    s_17              = as.numeric(s_17)
  )

#  Kruskal-Wallis tests 
test_vars <- c("perspicuity", "dependability", "understandability", "performance", "s_17")

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

# Summary table 
kw_table <- bind_rows(kw_rows)

cat("  KRUSKAL-WALLIS RESULTS SUMMARY (Survey Scales)\n")
print(kw_table, n = Inf)

write_csv(kw_table, "kruskal_wallis_results_survey.csv")
cat("\nSaved: kruskal_wallis_results_survey.csv\n")

#  Post-hoc: Dunn + Holm 
for (v in test_vars) {
  cat(sprintf("  DUNN POST-HOC (Holm): %s\n", v))
  print(dunn_test(merged, as.formula(paste(v, "~ variant")), p.adjust.method = "holm"))
}
