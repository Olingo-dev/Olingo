<div>

![Olingo banner](https://github.com/Olingo-dev/Olingo/blob/main/.media/olingo_github_banner.png?raw=true)
</div>
<div align="center">

![GitHub top language](https://img.shields.io/github/languages/top/Olingo-dev/Olingo)
</div>
# Olingo
A lightweight Docker UI build for the web.




# Configuration
Olingo is fully configurable using environment variables.

| Environment variable | Description                                                                                                                                                                                                                                                                                                |
|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| APP_PORT             | Set the port the app will be exposed on                                                                                                                                                                                                                                                                    |
| APP_NAME             | Set the app name. I don’t know why but you can do it!                                                                                                                                                                                                                                                      |
| LOG_FILENAME         | LOG_FILENAME is the file to write logs to. Backup log files will be retainedin the same directory. It uses -lumberjack.log in os.TempDir() if empty.                                                                                                                                                           |
| LOG_MAX_SIZE         | LOG_MAX_SIZE is the maximum size in megabytes of the log file before it gets rotated. It defaults to 100 megabytes.                                                                                                                                                                                             |
| LOG_MAX_AGE          | LOG_MAX_AGE is the maximum number of days to retain old log files based on the timestamp encoded in their filename. Note that a day is defined as 24 hours and may not exactly correspond to calendar days due to daylight savings, leap seconds, etc. The default is not to remove old log files based on age. |
| LOG_MAX_BACKUPS      | LOG_MAX_BACKUPS is the maximum number of old log files to retain. The default is to retain all old log files (though LOG_MAX_AGE may still cause them to get deleted.)                                                                                                                                                                                                            |
| LOG_LOCAL_TIME       | LOG_LOCAL_TIME determines if the time used for formatting the timestamps in backup files is the computer's local time. The default is to use UTC time.                                                                                                                                                          |
| LOG_COMPRESS         | LOG_COMPRESS determines if the rotated log files should be compressed using gzip. The default is not to perform compression.                                                                                                                                                                                   |                                                                                               






# Roadmap
- Build the thing