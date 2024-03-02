import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder

# Load the dataset
data = pd.read_csv("data.csv")

data['datetime'] = pd.to_datetime(data['datetime'])

data['day_of_week'] = data['datetime'].dt.day_name()

encoder = LabelEncoder()
data['day_of_week_encoded'] = encoder.fit_transform(data['day_of_week'])

data['date'] = data['datetime'].dt.date
data['time'] = data['datetime'].dt.time

X = data[['day_of_week_encoded']]
y = data['time']

model = RandomForestRegressor()
model.fit(X, y)

import joblib
joblib.dump(model, 'study_time_predictor.pkl')
