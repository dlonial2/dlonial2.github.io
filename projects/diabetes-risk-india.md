---
layout: page
title: Diabetes Risk Prediction (India Dataset)
permalink: /projects/diabetes-risk-india
---

## Project Title
**Diabetes Risk Prediction (India Dataset)**

## Quick blurb
I worked with Kaggle's "Diabetes Prediction (India)" dataset, which tracks 26 clinical and lifestyle features for more than 5,000 patients. After cleaning mixed numerical and categorical columns (median and mode imputation, one-hot encoding, rescaling) I compared a regularised logistic regression baseline against a random forest. The data is noisy and imbalanced, so scores stay close to chance, but the project centres on disciplined feature engineering, end-to-end evaluation, and honest reporting.

## Key Metrics

| Model | Accuracy | Precision | Recall | F1 | ROC-AUC |
| --- | --- | --- | --- | --- | --- |
| Logistic Regression | 0.502 | 0.511 | 0.612 | 0.557 | 0.502 |
| Random Forest | 0.511 | 0.520 | 0.566 | 0.542 | 0.506 |

Recall mattered most so the pipeline favours capturing as many potential positives as possible, even while precision drops.

## Visuals

<figure>
  <img src="/models/diabetes_india_roc_curve.png" alt="ROC curve for logistic regression on the India diabetes dataset">
  <figcaption>ROC Curve – Logistic Regression</figcaption>
</figure>

<figure>
  <img src="/models/diabetes_india_confusion_matrix.png" alt="Normalised confusion matrix for logistic regression on the India diabetes dataset">
  <figcaption>Normalised Confusion Matrix</figcaption>
</figure>

<figure>
  <img src="/models_rf/rf_india_roc_curve.png" alt="ROC curve for random forest on the India diabetes dataset">
  <figcaption>ROC Curve – Random Forest</figcaption>
</figure>

<figure>
  <img src="/models_rf/rf_india_confusion_matrix.png" alt="Normalised confusion matrix for random forest on the India diabetes dataset">
  <figcaption>Normalised Confusion Matrix – Random Forest</figcaption>
</figure>

## Process Snapshot

- Data cleaning: normalised categorical fields, mapped "Yes/No" answers to 1/0, median-imputed numerics.
- Preprocessing pipeline: scaled numeric columns for logistic regression and one-hot encoded categorical features.
- Training & evaluation: stratified 80/20 split with metrics logged to JSON and plots saved for review.
- Artifacts: exported the sklearn pipeline (`diabetes_india_pipeline.joblib`), metrics JSON, plots, and a Streamlit app for interactive predictions.

## Limitations & Next Steps

- Dataset signal is weak—ROC-AUC hovers around 0.5—so current models behave only marginally better than chance.
- Next steps: experiment with gradient boosting, feature selection, and cross-validation sweeps to search for better generalisation.
- This work supports product experimentation only and is **not medical advice**.

## Links

- [GitHub repo](https://github.com/dlonial2/diabetes-risk-india)
