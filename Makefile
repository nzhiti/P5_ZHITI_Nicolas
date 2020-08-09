run: run-back run-front

run-front :
	cd frontend;
	npm start;


run-back :
	cd backend;
	node server;

