all:
	python -m uvicorn app:app --host 0.0.0.0 --port 3000 --reload &
	pm2 start ../node-server/main.js

stop:
	pm2 stop all
	pkill -f "uvicorn"