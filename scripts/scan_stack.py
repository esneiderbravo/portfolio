import pathlib, collections

base = pathlib.Path("/Users/esneiderbravo/LendingFront")
skip = {"node_modules", ".next", "ci-cache", "portfolio"}
infra = collections.Counter()

keywords = {
    "Kafka": "kafka",
    "Redis": "redis",
    "PostgreSQL": "psycopg2",
    "AWS/Boto3": "boto3",
    "Celery": "celery",
    "FastAPI": "fastapi",
    "GraphQL": "graphene",
    "Rollbar": "rollbar",
    "Twilio": "twilio",
    "Sendgrid": "sendgrid",
    "Salesforce": "salesforce",
    "Elastic APM": "elastic-apm",
    "Auth/JWT": "authlib",
}

for req in base.rglob("requirements.txt"):
    if any(s in req.parts for s in skip):
        continue
    txt = req.read_text(errors="ignore").lower()
    for name, kw in keywords.items():
        if kw in txt:
            infra[name] += 1

for f in list(base.rglob("*.yml")) + list(base.rglob("*.yaml")):
    if any(s in f.parts for s in skip):
        continue
    try:
        txt = f.read_text(errors="ignore").lower()
    except Exception:
        continue
    for kw, label in [("kafka","Kafka"),("docker","Docker"),("ansible","Ansible"),("jenkins","Jenkins"),("kubernetes","Kubernetes")]:
        if kw in txt:
            infra[label] += 1

for name, count in sorted(infra.items(), key=lambda x: -x[1]):
    print(f"{name}: {count}")

