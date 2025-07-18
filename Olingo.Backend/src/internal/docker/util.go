package docker

import (
	"fmt"

	"github.com/docker/docker/api/types/events"
)

func PrintDockerEvent(event *events.Message) {
	fmt.Printf("Type: %s, Action: %s, ID: %s, Time: %d\n Attributes %v",
		event.Type, event.Action, event.Actor.ID, event.Time, event.Actor.Attributes)
}

const PREFIX = "dev.olingo."

func GenerateLabels(groupId string) map[string]string {
	labels := make(map[string]string)
	labels[PREFIX+"group"] = groupId
	labels[PREFIX+"managed"] = string("true")
	return labels
}

func IsValidImage(image string) bool {

	return true
}
