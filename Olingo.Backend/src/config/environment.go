package config

type EnvironmentStruct struct {
	Version      string
	Debug        string
	Devcontainer string
}

var Prefix = "OLINGO_"
var Environment = EnvironmentStruct{
	Version:      "VERSION",
	Debug:        "DEBUG",
	Devcontainer: "DEVCONTAINER",
}
