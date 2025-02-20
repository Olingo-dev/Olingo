package registry

import "sync"

type SingletonRegistery struct {
	services map[string]interface{}
	mu       sync.Mutex
}

var registeryInstance *SingletonRegistery
var once sync.Once

func GetRegistry() *SingletonRegistery {
	once.Do(func() {
		registeryInstance = &SingletonRegistery{
			services: make(map[string]interface{}),
		}
	})
	return registeryInstance
}

func (r *SingletonRegistery) Register(name string, singleton interface{}) {
	r.mu.Lock()
	defer r.mu.Unlock()
	if _, exists := r.services[name]; !exists {
		r.services[name] = singleton
	}
}

func (r *SingletonRegistery) Get(name string) interface{} {
	r.mu.Lock()
	defer r.mu.Unlock()
	return r.services[name]
}
