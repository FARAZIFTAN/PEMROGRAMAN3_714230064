package config

import (
	"context"
	"fmt"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var DBName = "db_2025"
var MahasiswaCollection = "data_mahasiswa"
var MongoString string = os.Getenv("MONGOSTRING")

func MongoConnect(dbname string) (*mongo.Database, error) {
	// Set client options
	clientOptions := options.Client().ApplyURI(MongoString)
	
	// Set timeout
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	
	// Connect to MongoDB
	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		return nil, fmt.Errorf("error connecting to MongoDB: %v", err)
	}
	
	// Check the connection
	if err := client.Ping(ctx, nil); err != nil {
		return nil, fmt.Errorf("error pinging MongoDB: %v", err)
	}
	
	fmt.Println("Connected to MongoDB!")
	return client.Database(dbname), nil
}
