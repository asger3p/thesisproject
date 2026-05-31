library(dplyr)
library(readr)
library(tidyr)

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
    across(c(instructionsTime, panelTime1, panelTime2), as.numeric)
  )

# UEQ scale transformation (-3 to +3 via value - 4)
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

# TOAST scale means per participant (scale: 1–7)
understandability_items <- c("s_1", "s_3", "s_4", "s_8")
performance_items       <- c("s_2", "s_5", "s_6", "s_7", "s_9")

merged <- merged |>
  mutate(
    across(all_of(c(understandability_items, performance_items)), as.numeric),
    understandability = rowMeans(across(all_of(understandability_items)), na.rm = TRUE),
    performance       = rowMeans(across(all_of(performance_items)),       na.rm = TRUE),
    s_17              = as.numeric(s_17)
  )

# UEQ summary: Perspicuity & Dependability by variant
cat("UEQ SCALES BY VARIANT (scale: -3 = worst, 0 = neutral, +3 = best)\n")

ueq_summary <- merged |>
  group_by(variant) |>
  summarise(
    n                      = n(),
    `Perspicuity M (SD)`   = sprintf("%.2f (%.2f)", mean(perspicuity,   na.rm = TRUE), sd(perspicuity,   na.rm = TRUE)),
    `Dependability M (SD)` = sprintf("%.2f (%.2f)", mean(dependability, na.rm = TRUE), sd(dependability, na.rm = TRUE)),
    .groups = "drop"
  )

ueq_overall <- tibble(
  variant                = "Overall",
  n                      = sum(!is.na(merged$perspicuity)),
  `Perspicuity M (SD)`   = sprintf("%.2f (%.2f)", mean(merged$perspicuity,   na.rm = TRUE), sd(merged$perspicuity,   na.rm = TRUE)),
  `Dependability M (SD)` = sprintf("%.2f (%.2f)", mean(merged$dependability, na.rm = TRUE), sd(merged$dependability, na.rm = TRUE))
)

print(bind_rows(ueq_summary, ueq_overall), n = Inf)

# TOAST summary: Understandability & Performance by variant
cat("\nTOAST SCALES BY VARIANT (scale: 1 = strongly disagree, 7 = strongly agree)\n")

toast_summary <- merged |>
  group_by(variant) |>
  summarise(
    n                          = n(),
    `Understandability M (SD)` = sprintf("%.2f (%.2f)", mean(understandability, na.rm = TRUE), sd(understandability, na.rm = TRUE)),
    `Performance M (SD)`       = sprintf("%.2f (%.2f)", mean(performance,       na.rm = TRUE), sd(performance,       na.rm = TRUE)),
    .groups = "drop"
  )

toast_overall <- tibble(
  variant                    = "Overall",
  n                          = sum(!is.na(merged$understandability)),
  `Understandability M (SD)` = sprintf("%.2f (%.2f)", mean(merged$understandability, na.rm = TRUE), sd(merged$understandability, na.rm = TRUE)),
  `Performance M (SD)`       = sprintf("%.2f (%.2f)", mean(merged$performance,       na.rm = TRUE), sd(merged$performance,       na.rm = TRUE))
)

print(bind_rows(toast_summary, toast_overall), n = Inf)

# Confidence score summary: s_17 by variant (scale: 1–5)
cat("\nCONFIDENCE SCORE BY VARIANT (scale: 1 = not confident, 5 = very confident)\n")

confidence_summary <- merged |>
  group_by(variant) |>
  summarise(
    n      = sum(!is.na(s_17)),
    Mean   = round(mean(s_17,   na.rm = TRUE), 2),
    SD     = round(sd(s_17,     na.rm = TRUE), 2),
    Median = median(s_17,       na.rm = TRUE),
    IQR    = IQR(s_17,          na.rm = TRUE),
    .groups = "drop"
  )

confidence_overall <- tibble(
  variant = "Overall",
  n       = sum(!is.na(merged$s_17)),
  Mean    = round(mean(merged$s_17,   na.rm = TRUE), 2),
  SD      = round(sd(merged$s_17,     na.rm = TRUE), 2),
  Median  = median(merged$s_17,       na.rm = TRUE),
  IQR     = IQR(merged$s_17,          na.rm = TRUE)
)

print(bind_rows(confidence_summary, confidence_overall), n = Inf)

# Authentication outcome tables
variant_labels <- c("1" = "Theme-Pad", "2" = "2P", "3" = "PIN-Variation")

auth_table <- function(data, access_var, success_val, label) {
  cat(sprintf("\n%s\n", label))

  d <- data |>
    filter(.data[[access_var]] != "null") |>
    mutate(
      Outcome = ifelse(.data[[access_var]] == success_val, "Success", "Failure"),
      Variant = recode(as.character(variant), !!!variant_labels)
    )

  variants <- c("Theme-Pad", "2P", "PIN-Variation")

  counts <- d |>
    group_by(Outcome, Variant) |>
    summarise(n = n(), .groups = "drop")

  totals_col <- counts |>
    group_by(Variant) |>
    summarise(total = sum(n), .groups = "drop")

  counts <- counts |>
    left_join(totals_col, by = "Variant") |>
    mutate(pct = n / total * 100)

  # Count table
  cat("  Counts:\n")
  count_tbl <- counts |>
    select(Outcome, Variant, n) |>
    tidyr::pivot_wider(names_from = Variant, values_from = n, values_fill = 0) |>
    mutate(Total = rowSums(across(all_of(variants))))

  total_row <- tibble(Outcome = "Total") |>
    bind_cols(as_tibble(t(colSums(count_tbl[, -1]))) |> setNames(names(count_tbl[-1])))

  print(bind_rows(count_tbl, total_row), n = Inf)

  # Percentage table
  cat("  Percentages (column %):\n")
  pct_tbl <- counts |>
    mutate(cell = sprintf("%.1f%%", pct)) |>
    select(Outcome, Variant, cell) |>
    tidyr::pivot_wider(names_from = Variant, values_from = cell, values_fill = "0.0%")

  print(pct_tbl, n = Inf)
}

auth_table(merged, "accessType1", "regular", "REGULAR AUTHENTICATION (regular = success)")
auth_table(merged, "accessType2", "panic",   "DURESS AUTHENTICATION (panic = success)")

# Time variables by variant
time_labels <- c(
  "instructionsTime" = "Instruction Time (ms)",
  "panelTime1"       = "Regular Authentication Time (ms)",
  "panelTime2"       = "Duress Authentication Time (ms)"
)

for (v in names(time_labels)) {
  cat(sprintf("\n%s\n", time_labels[[v]]))

  time_summary <- merged |>
    group_by(variant) |>
    summarise(
      n      = sum(!is.na(.data[[v]])),
      Mean   = round(mean(.data[[v]], na.rm = TRUE), 2),
      SD     = round(sd(.data[[v]],   na.rm = TRUE), 2),
      Median = median(.data[[v]],     na.rm = TRUE),
      IQR    = IQR(.data[[v]],        na.rm = TRUE),
      .groups = "drop"
    )

  time_overall <- tibble(
    variant = "Overall",
    n       = sum(!is.na(merged[[v]])),
    Mean    = round(mean(merged[[v]], na.rm = TRUE), 2),
    SD      = round(sd(merged[[v]],   na.rm = TRUE), 2),
    Median  = median(merged[[v]],     na.rm = TRUE),
    IQR     = IQR(merged[[v]],        na.rm = TRUE)
  )

  print(bind_rows(time_summary, time_overall), n = Inf)
}
