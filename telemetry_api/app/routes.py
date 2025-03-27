from fastapi import APIRouter, Query
from typing import List, Optional
from datetime import datetime
from app.db import get_telemetry_records

router = APIRouter(prefix="/api/v1")

@router.get("/telemetry")
def get_telemetry(
    start_time: datetime = Query(...),
    end_time: datetime = Query(...)
):
    data = get_telemetry_records(start_time, end_time)
    return {"data": data}

@router.get("/telemetry/current")
def get_current_telemetry():
    from app.db import get_latest_telemetry
    return {"data": get_latest_telemetry()}

@router.get("/telemetry/anomalies")
def get_anomalies(
    start_time: datetime = Query(...),
    end_time: datetime = Query(...)
):
    from app.db import get_anomalous_telemetry
    return {"data": get_anomalous_telemetry(start_time, end_time)}

@router.get("/telemetry/stats")
def get_aggregated_telemetry(
    start_time: datetime = Query(...),
    end_time: datetime = Query(...),
    agg: str = Query("avg", enum=["min", "max", "avg"])
):
    from app.db import get_aggregated_telemetry
    return {"data": get_aggregated_telemetry(start_time, end_time, agg)}