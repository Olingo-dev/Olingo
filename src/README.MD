## Structure:

### API

Handles all API-related operations, providing a standardized way to retrieve and interact with general system data. This module ensures seamless communication between the dashboard and the caching layer.

### Events
Continuously monitors container states and tracks real-time changes, such as starts, stops, crashes, and restarts. It ensures that system events are captured, logged, and processed accordingly, enabling proactive management and automation of responses.

### Sync
Maintains data integrity by synchronizing the database with the actual state of Docker containers. This process is particularly useful when the cached information becomes outdated, ensuring that the system always reflects the most current status of running services.


## Patterns:

### Pipeline Pattern
The Pipeline Pattern is a design pattern used to break down complex processing into a sequence of independent, reusable steps (or stages). Each stage in the pipeline processes data and then passes it to the next stage.
#### Used for:
- Event Processor → Takes necessary actions (e.g., logging, triggering alerts)

### Repository Pattern 
The Repository Pattern is used to abstract data access logic from the business logic, providing a clean way to interact with data sources (databases, APIs, file storage). Instead of directly querying a database, the application interacts with a repository, which handles data retrieval, caching, and persistence.
#### Used for:
- Abstraction
- Testability