# Agent Data Update API

The dashboard reads all data from JSON files in `/public/`. 
Agents can update any section via HTTP POST.

## Endpoint
POST http://localhost:3000/api/update

## Auth Header
x-update-token: bmo-update-2026

## Request Body
```json
{
  "file": "data",           // data | sales | research | build | health
  "data": { ... }           // partial object — merged with existing data
}
```

## Examples

### Update morning brief (n8n workflow)
```json
POST /api/update
{
  "file": "data",
  "data": {
    "brief": {
      "date": "Thursday, April 4 2026",
      "bullets": [
        { "text": "New email from Ritual Beauty needs reply", "urgent": true },
        { "text": "MoonBrew call at 3pm", "urgent": false }
      ]
    }
  }
}
```

### Update revenue stats
```json
POST /api/update
{
  "file": "data",
  "data": {
    "stats": {
      "mtdRevenue": "$48k",
      "pipelineValue": "$195k",
      "forecastValue": "$102k",
      "clientsActive": 13
    }
  }
}
```

### Add a new email draft
POST /api/update — send full emailDrafts array with new item appended

### Update agent status
```json
POST /api/update
{
  "file": "data",
  "data": {
    "agents": [
      { "name": "BMO", "status": "active", "tasksToday": 22, "progress": 85, "task": "Processing inbox" }
    ]
  }
}
```

### Update build progress
```json
POST /api/update
{
  "file": "build",
  "data": {
    "featuredBuild": { "pct": 85, "status": "In Progress" }
  }
}
```

## Data refreshes automatically every 30 seconds on the dashboard.
