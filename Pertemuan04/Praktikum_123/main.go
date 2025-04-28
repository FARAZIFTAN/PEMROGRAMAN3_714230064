package main

import (
	"fmt"
	"inibackend/config"
	"inibackend/router"
	"log"
	"os"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/joho/godotenv"
)

func init() {
	err := godotenv.Load()
	if err != nil {
		fmt.Println(" Error Loading Environment Variables|", err)
	}
}

func main() {
	app := fiber.New()

	//logging Request
	app.Use(logger.New())

	//basic Cors
	app.Use(cors.New(cors.Config{
		AllowOrigins:     strings.Join(config.GetAllowedOrigins(), ","),
		AllowCredentials: true,
		AllowMethods:     "GET,POST,PUT,DELETE,",
	}))

	//Router mahasiswa
	router.SetupRoutes(app)

	//handler 404
	app.Use(func(c *fiber.Ctx) error {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Endpoint Not Found",
			"status":  fiber.StatusNotFound,
		})
	})

	//baca port yang ada di .env
	port := os.Getenv("PORT")
	if port == "" {
		port = "3000" //default port
	}

	//untuk log cek konek di port mana
	log.Printf("Server running on port%s", port)
	if err := app.Listen(":" + port); err != nil {
		log.Fatalf("Error starting server: %v", err)
	} //koneksi terputus
}
