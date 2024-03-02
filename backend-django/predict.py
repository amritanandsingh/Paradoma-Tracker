import pandas as pd
from sklearn.preprocessing import LabelEncoder
import joblib

# Load the trained model
model = joblib.load('study_time_predictor.pkl')

current_date = pd.to_datetime('today').date()

next_day_of_week = (current_date + pd.Timedelta(days=1)).day_name()

encoder = LabelEncoder()
next_day_encoded = encoder.fit_transform([next_day_of_week])[0]

predicted_time = model.predict([[next_day_encoded]])

print("Predicted study time for the next day:", predicted_time[0])
