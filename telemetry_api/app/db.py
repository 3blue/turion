import psycopg2
import os

DB_URL = os.getenv("DB_URL", "postgresql://telemetry:secret123@localhost:5432/telemetrydb")

def get_telemetry_records(start_time, end_time):
    conn = psycopg2.connect(DB_URL)
    cur = conn.cursor()

    cur.execute("""
        SELECT timestamp, subsystem_id, temperature, battery, altitude, signal, anomaly
        FROM telemetry
        WHERE timestamp BETWEEN %s AND %s
        ORDER BY timestamp ASC
    """, (start_time, end_time))

    rows = cur.fetchall()
    cur.close()
    conn.close()

    result = [
        {
            "timestamp": str(r[0]),
            "subsystem_id": r[1],
            "temperature": r[2],
            "battery": r[3],
            "altitude": r[4],
            "signal": r[5],
            "anomaly": r[6]
        }
        for r in rows
    ]
    return result

def get_latest_telemetry():
    conn = psycopg2.connect(DB_URL)
    cur = conn.cursor()

    cur.execute("""
        SELECT timestamp, subsystem_id, temperature, battery, altitude, signal, anomaly
        FROM telemetry
        ORDER BY timestamp DESC
        LIMIT 1
    """)

    row = cur.fetchone()
    cur.close()
    conn.close()

    if not row:
        return {}

    return {
        "timestamp": str(row[0]),
        "subsystem_id": row[1],
        "temperature": row[2],
        "battery": row[3],
        "altitude": row[4],
        "signal": row[5],
        "anomaly": row[6]
    }

def get_anomalous_telemetry(start_time, end_time):
    conn = psycopg2.connect(DB_URL)
    cur = conn.cursor()

    cur.execute("""
        SELECT timestamp, subsystem_id, temperature, battery, altitude, signal, anomaly
        FROM telemetry
        WHERE timestamp BETWEEN %s AND %s
          AND NOT anomaly @> ARRAY['nominal']
        ORDER BY timestamp ASC
    """, (start_time, end_time))

    rows = cur.fetchall()
    cur.close()
    conn.close()

    return [
        {
            "timestamp": str(r[0]),
            "subsystem_id": r[1],
            "temperature": r[2],
            "battery": r[3],
            "altitude": r[4],
            "signal": r[5],
            "anomaly": r[6]
        }
        for r in rows
    ]

def get_aggregated_telemetry(start_time, end_time, agg_type):
    if agg_type not in ("min", "max", "avg"):
        raise ValueError("Invalid aggregation type")

    conn = psycopg2.connect(DB_URL)
    cur = conn.cursor()

    # Dynamically construct SQL for the aggregation
    query = f"""
        SELECT
            {agg_type}(temperature),
            {agg_type}(battery),
            {agg_type}(altitude),
            {agg_type}(signal)
        FROM telemetry
        WHERE timestamp BETWEEN %s AND %s
    """

    cur.execute(query, (start_time, end_time))
    row = cur.fetchone()
    cur.close()
    conn.close()

    return {
        "temperature": row[0],
        "battery": row[1],
        "altitude": row[2],
        "signal": row[3]
    }