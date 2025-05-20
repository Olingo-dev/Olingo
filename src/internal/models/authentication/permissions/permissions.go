package permissions

const (
	CreateGroup = 1 << iota
	DeleteGroup
	EditGroup
	ViewGroups
	ViewLogs
	CreateContainer
	EditContainer
	DeleteContainer
	ViewContainers
	CreateNode
	DeleteNode
	EditNode
	ViewNodes
	// ONLY ADD PERMISSIONS ABOVE THIS LINE.
	AllowAll
)
