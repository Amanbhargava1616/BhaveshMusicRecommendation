# Chatbot Project

## Description

This project implements a simple chatbot using natural language processing techniques. The chatbot is capable of responding to user queries and engaging in basic conversation.

## Installation

1. Clone the repository:

```bash
   git clone https://github.com/Amanbhargava1616/BhaveshMusicRecommendation.git
   cd BhaveshMusicRecommendation
```

2. Create virtual environment

```bash
python -m venv venv
```

3. If Some Error Occured

```press windows+x
   select terminal(admin)
   Set-ExecutionPolicy RemoteSigned
   restart the vsc
```

4. Activate virtual environment

```bash
.\venv\Scripts\activate
```

5. Install dependencies

```bash
pip install -r .\requirements.txt
```

6. Navigate to the server

```bash
cd src
```

7. Run the server

```bash
uvicorn app:app --reload
```

This commad stars the api in a development mode . Any changes to the code will restart the server.

8. Test the Code at [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
