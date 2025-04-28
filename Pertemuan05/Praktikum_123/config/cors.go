package config

var allowedOrigins = []string {
	"http://localhpst:3000",
	"https://indrariksa.github.io",
}

func GetAllowedOrigins() []string {
	return allowedOrigins
}

