

all: clean
	# Build and run the containers
	docker-compose -f docker-compose.yml up --build

deploy:
	# Build and run the containers
	docker-compose -f docker-compose.deploy.yml up -d --build

### Clean Containers Functions ####

define rm_containers
	if [ $$(docker ps -aq -f name=$(1)) ]; then \
		docker rm -f $$(docker ps -aq -f name=$(1)); \
	fi

endef

define rm_images
	if [ $$(docker images -q $(1)) ]; then \
		docker rmi $$(docker images -q $(1)); \
	fi
endef


stop:
	@ docker-compose stop
	@ $(call rm_containers,"pgadmin-service")

clean:
	@ $(call rm_containers,"frontend-service")
	@ $(call rm_containers,"backend-service")
	@ $(call rm_containers,"pgadmin-service")
	@ $(call rm_containers,"db-service")
	@ $(call rm_containers,"frontend-service")
	@ $(call rm_containers,"backend-service")
	@ $(call rm_containers,"pgadmin-service")
	@ $(call rm_containers,"db-service")

fclean: clean
	@ echo "Fclean going clean everything, images containers and \"db volumes\" will be removed"
	@ docker-compose rm -f
	@ $(call rm_images, "backend-image")
	@ $(call rm_images, "frontend-image")
	@ $(call rm_images, "postgres")
	@ $(call rm_images, "dpage/pgadmin4")
	@ rm -rf backend/staticfiles
	@ rm -rf backend/*/__pycache__
	@ rm -rf backend/__pycache__
	@ rm -rf backend/db.sqlite3
	@ docker volume rm postgres_data
	@ docker network rm revolus_corelab_network


debug: clean_debug
	docker run --name pgadmin-service -p 5050:80 --network revolus_corelab_network --link db --env-file .env dpage/pgadmin4:8.5

clean_debug:
	@ $(call rm_containers,"pgadmin-service")
	# remove image pgadmin
	# @ $(call rm_images, "dpage/pgadmin4:8.5")

resetdb:
	 # Remove db.sqlite3 file
	 rm -rf backend/db.sqlite3
	 # Remove migrations folder files
	 find . -path "backend/*/migrations/*.py" -not -name "__init__.py" -delete
	 find . -path "*/migrations/*.pyc"  -delete
	 # makemigrations and migrate on backend-service
	 docker exec backend-service python manage.py makemigrations
	 docker exec backend-service python manage.py migrate

	
ic: fclean up clean_debug


.PHONY: all clean fclean clean_debug debug ic stop