from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import nltk
import string
import random
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = FastAPI()

class RequestBody(BaseModel):
    user_input: str

f = open('chatbot.txt', 'r', errors='ignore')
raw = f.read()
raw = raw.lower()

sent_tokens = nltk.sent_tokenize(raw)
word_tokens = nltk.word_tokenize(raw)

lemmer = nltk.stem.WordNetLemmatizer()

def LemTokens(tokens):
    return [lemmer.lemmatize(token) for token in tokens]

remove_punct_dict = dict((ord(punct), None) for punct in string.punctuation)

def LemNormalize(text):
    return LemTokens(nltk.word_tokenize(text.lower().translate(remove_punct_dict)))

GREETING_INPUTS = ("hello", "hi", "greetings", "sup", "what's up", "hey")
GREETING_RESPONSES = ["hi", "hey", "nods", "hi there", "hello", "I am glad! You are talking to me"]

def greeting(sentence):
    for word in sentence.split():
        if word.lower() in GREETING_INPUTS:
            return random.choice(GREETING_RESPONSES)

def response(user_response):
    robo_response = ''
    sent_tokens.append(user_response)
    TfidfVec = TfidfVectorizer(tokenizer=LemNormalize, stop_words='english')
    tfidf = TfidfVec.fit_transform(sent_tokens)
    vals = cosine_similarity(tfidf[-1], tfidf)
    idx = vals.argsort()[0][-2]
    flat = vals.flatten()
    flat.sort()
    req_tfidf = flat[-2]
    if req_tfidf == 0:
        robo_response = "I am sorry! I don't understand you"
        return robo_response
    else:
        robo_response = sent_tokens[idx]
        return robo_response

@app.post("/")
async def root(body: RequestBody):
    user_input = body.user_input.lower()
    if user_input == 'bye':
        return {"message": "ROBO: Bye! take care.."}
    elif user_input in ('thanks', 'thank you'):
        return {"message": "ROBO: You are welcome.."}
    elif greeting(user_input) is not None:
        return {"message": "ROBO: " + greeting(user_input)}
    else:
        robo_response = response(user_input)
        sent_tokens.remove(user_input)
        return {"message":  robo_response}

