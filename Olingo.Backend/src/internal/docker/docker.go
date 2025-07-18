package docker

import "github.com/docker/docker/api/types/container"

type DockerEvent struct {
	Type      string `json:"type"`
	Action    string `json:"action"`
	Id        string `json:"id"`
	Timestamp int64  `json:"timestamp"`
	Name      string `json:"name"`
	Image     string `json:"image"`
}

type DockerContainer struct {
	Id        string           `json:"id"`
	Name      string           `json:"name"`
	CreatedAt int64            `json:"created-at"`
	Image     string           `json:"image"`
	Ports     []container.Port `json:"ports"`
}
type DockerAttributesMap struct {
	Name  string
	Image string
}
type ImageFilter struct {
	Reference string
}
type DockerFilterAttributesMap struct {
	Image ImageFilter
}

// Map Attributes to contstant values, One place to update them.
var DockerAttributes = DockerAttributesMap{
	Name:  "name",
	Image: "image",
}
var DockerFilterAttributes = DockerFilterAttributesMap{
	Image: ImageFilter{
		Reference: "reference",
	},
}
