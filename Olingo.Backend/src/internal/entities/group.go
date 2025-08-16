package entities

type Group struct {
	ID   string
	Name string
}

func (g *Group) GetID() string {
	return g.ID
}
