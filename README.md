<div>

![Olingo banner](https://github.com/Olingo-dev/Olingo/blob/canary/.media/identity/olingo_github_banner.png?raw=true)
</div>
<div align="center">

![GitHub top language](https://img.shields.io/github/languages/top/Olingo-dev/Olingo)

</div>

# Olingo
A lightweight Docker UI build for the web.




## Configuration
Olingo is fully configurable using environment variables.

| Environment variable | Description                                                                                                                                                                                                                                                                                                |
|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| APP_PORT             | Set the port the app will be exposed on                                                                                                                                                                                                                                                                    |
| LOG_FILENAME         | LOG_FILENAME is the file to write logs to. Backup log files will be retainedin the same directory. It uses -lumberjack.log in os.TempDir() if empty.                                                                                                                                                           |
| LOG_MAX_SIZE         | LOG_MAX_SIZE is the maximum size in megabytes of the log file before it gets rotated. It defaults to 100 megabytes.                                                                                                                                                                                             |
| LOG_MAX_AGE          | LOG_MAX_AGE is the maximum number of days to retain old log files based on the timestamp encoded in their filename. Note that a day is defined as 24 hours and may not exactly correspond to calendar days due to daylight savings, leap seconds, etc. The default is not to remove old log files based on age. |
| LOG_MAX_BACKUPS      | LOG_MAX_BACKUPS is the maximum number of old log files to retain. The default is to retain all old log files (though LOG_MAX_AGE may still cause them to get deleted.)                                                                                                                                                                                                            |
| LOG_LOCAL_TIME       | LOG_LOCAL_TIME determines if the time used for formatting the timestamps in backup files is the computer's local time. The default is to use UTC time.                                                                                                                                                          |
| LOG_COMPRESS         | LOG_COMPRESS determines if the rotated log files should be compressed using gzip. The default is not to perform compression.                                                                                                                                                                                   |                                                                                               
## Contributing
Olingo has provided a C4 Model (Levels 1–3) to help contributors gain a clear understanding of the current project setup:

- Level 1: [Context Diagram](https://github.com/Olingo-dev/Olingo/blob/canary/.media/diagrams/Olingo-context-diagram-lvl1.png)
  Offers a high-level overview of the system, including its users and interactions with external systems.

- Level 2: [Container Diagram](https://github.com/Olingo-dev/Olingo/blob/canary/.media/diagrams/Olingo-container-diagram-lvl2.png)
  Breaks down the system into various containers (applications or services) and illustrates how they communicate.

- Level 3: [Component Diagram](https://github.com/Olingo-dev/Olingo/blob/canary/.media/diagrams/Olingo-component-diagram-lvl3.png)
  Delves into the internal structure of individual containers, highlighting key components and their responsibilities.

These diagrams are designed to help you quickly understand the system's architecture and how different parts interact.

### Contribution Guidelines
Before contributing, please make sure to review and follow the project's [contribution guidelines](./CONTRIBUTING.md). These guidelines cover important aspects such as coding standards, documentation requirements, and the pull request process to ensure consistency and quality across all contributions.



## Roadmap
- Build the thing
