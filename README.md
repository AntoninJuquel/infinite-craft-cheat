# Infinite Craft Cheat

## Setup

## .env file

Create a `.env` file in the root of the project with the following the .env.sample file.

### Neo4j

Go to [Neo4J aura](https://console.neo4j.io/) and create a new database. Then, copy the connection string and credentials to the `.env` file.
Copy the content of the initial-data.cypher file and paste it in the Neo4J browser to create the initial data.
Copy the content of the constraints.cypher file and paste it in the Neo4J browser to create the constraints.

### Infinite Craft

Go to [Infinite Craft](https://neal.fun/infinite-craft/) and copy the cookie value to the `.env` file escapping the `__cf_bm=` part.

## Run

To run the project, execute the following command:

```bash
yarn start
```

## Api

### GET [/api/v1/cheat](http://localhost:3000/api/v1/cheat)

Get all found recipes in the database. And the command to add the recipe to the inventory.

```json
{
  "infinite-craft-data": {
    "elements": [
      {
        "discovered": false,
        "emoji": "💧",
        "name": "Water",
        "text": "Water"
      },
      {
        "discovered": false,
        "emoji": "🔥",
        "name": "Fire",
        "text": "Fire"
      },
      {
        "discovered": false,
        "emoji": "🌬️",
        "name": "Wind",
        "text": "Wind"
      },
      {
        "discovered": false,
        "emoji": "🌍",
        "name": "Earth",
        "text": "Earth"
      },
      {
        "discovered": false,
        "emoji": "🌊",
        "name": "Lake",
        "text": "Lake"
      },
      {
        "discovered": false,
        "emoji": "💨",
        "name": "Steam",
        "text": "Steam"
      },
      {
        "discovered": false,
        "emoji": "🌊",
        "name": "Wave",
        "text": "Wave"
      },
      {
        "discovered": false,
        "emoji": "🌱",
        "name": "Plant",
        "text": "Plant"
      },
      {
        "discovered": false,
        "emoji": "🌋",
        "name": "Volcano",
        "text": "Volcano"
      },
      {
        "discovered": false,
        "emoji": "💨",
        "name": "Smoke",
        "text": "Smoke"
      },
      {
        "discovered": false,
        "emoji": "🌋",
        "name": "Lava",
        "text": "Lava"
      },
      {
        "discovered": false,
        "emoji": "🌪️",
        "name": "Tornado",
        "text": "Tornado"
      },
      {
        "discovered": false,
        "emoji": "🌫️",
        "name": "Dust",
        "text": "Dust"
      },
      {
        "discovered": false,
        "emoji": "🏔️",
        "name": "Mountain",
        "text": "Mountain"
      },
      {
        "discovered": false,
        "emoji": "🌊",
        "name": "Ocean",
        "text": "Ocean"
      },
      {
        "discovered": false,
        "emoji": "☁️",
        "name": "Cloud",
        "text": "Cloud"
      },
      {
        "discovered": false,
        "emoji": "🌊",
        "name": "Tsunami",
        "text": "Tsunami"
      },
      {
        "discovered": false,
        "emoji": "🐊",
        "name": "Swamp",
        "text": "Swamp"
      },
      {
        "discovered": false,
        "emoji": "🌫️",
        "name": "Fog",
        "text": "Fog"
      },
      {
        "discovered": false,
        "emoji": "🪨",
        "name": "Stone",
        "text": "Stone"
      },
      {
        "discovered": false,
        "emoji": "💩",
        "name": "Mud",
        "text": "Mud"
      },
      {
        "discovered": false,
        "emoji": "🚗",
        "name": "Engine",
        "text": "Engine"
      }
    ]
  },
  "command": "localStorage.setItem('infinite-craft-data', '{\"elements\":[{\"discovered\":false,\"emoji\":\"💧\",\"name\":\"Water\",\"text\":\"Water\"},{\"discovered\":false,\"emoji\":\"🔥\",\"name\":\"Fire\",\"text\":\"Fire\"},{\"discovered\":false,\"emoji\":\"🌬️\",\"name\":\"Wind\",\"text\":\"Wind\"},{\"discovered\":false,\"emoji\":\"🌍\",\"name\":\"Earth\",\"text\":\"Earth\"},{\"discovered\":false,\"emoji\":\"🌊\",\"name\":\"Lake\",\"text\":\"Lake\"},{\"discovered\":false,\"emoji\":\"💨\",\"name\":\"Steam\",\"text\":\"Steam\"},{\"discovered\":false,\"emoji\":\"🌊\",\"name\":\"Wave\",\"text\":\"Wave\"},{\"discovered\":false,\"emoji\":\"🌱\",\"name\":\"Plant\",\"text\":\"Plant\"},{\"discovered\":false,\"emoji\":\"🌋\",\"name\":\"Volcano\",\"text\":\"Volcano\"},{\"discovered\":false,\"emoji\":\"💨\",\"name\":\"Smoke\",\"text\":\"Smoke\"},{\"discovered\":false,\"emoji\":\"🌋\",\"name\":\"Lava\",\"text\":\"Lava\"},{\"discovered\":false,\"emoji\":\"🌪️\",\"name\":\"Tornado\",\"text\":\"Tornado\"},{\"discovered\":false,\"emoji\":\"🌫️\",\"name\":\"Dust\",\"text\":\"Dust\"},{\"discovered\":false,\"emoji\":\"🏔️\",\"name\":\"Mountain\",\"text\":\"Mountain\"},{\"discovered\":false,\"emoji\":\"🌊\",\"name\":\"Ocean\",\"text\":\"Ocean\"},{\"discovered\":false,\"emoji\":\"☁️\",\"name\":\"Cloud\",\"text\":\"Cloud\"},{\"discovered\":false,\"emoji\":\"🌊\",\"name\":\"Tsunami\",\"text\":\"Tsunami\"},{\"discovered\":false,\"emoji\":\"🐊\",\"name\":\"Swamp\",\"text\":\"Swamp\"},{\"discovered\":false,\"emoji\":\"🌫️\",\"name\":\"Fog\",\"text\":\"Fog\"},{\"discovered\":false,\"emoji\":\"🪨\",\"name\":\"Stone\",\"text\":\"Stone\"},{\"discovered\":false,\"emoji\":\"💩\",\"name\":\"Mud\",\"text\":\"Mud\"},{\"discovered\":false,\"emoji\":\"🚗\",\"name\":\"Engine\",\"text\":\"Engine\"}]}')"
}
```
