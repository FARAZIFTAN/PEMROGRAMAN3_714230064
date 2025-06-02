package config

var allowedOrigins = []string{
	"http://localhost:3000",
	"http://localhost:5173", // Menambahkan origin untuk React dev server
	"https://indrariksa.github.io",
}

func GetAllowedOrigins() []string {
	return allowedOrigins
}
