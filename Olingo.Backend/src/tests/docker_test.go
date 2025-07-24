package tests

import (
	"testing"

	"github.com/olingo-dev/olingo/internal/docker"
)

const PREFIX = docker.PREFIX

func TestGenerateLabels(t *testing.T) {
	t.Run("should generate labels with correct groupId and managed=true", func(t *testing.T) {
		groupId := "team-42"
		labels := docker.GenerateLabels(groupId)
		expectedKeys := []string{PREFIX + "group", PREFIX + "managed"}
		for _, key := range expectedKeys {
			if _, ok := labels[key]; !ok {
				t.Errorf("Expected key %q not found in labels map", key)
			}
		}
		if labels[PREFIX+"group"] != groupId {
			t.Errorf("Expected label %q to be %q, got %q", PREFIX+"group", groupId, labels[PREFIX+"group"])
		}
		if labels[PREFIX+"managed"] != "true" {
			t.Errorf("Expected label %q to be \"true\", got %q", PREFIX+"managed", labels[PREFIX+"managed"])
		}
	})
}
