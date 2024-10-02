from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_chroma import Chroma
from langchain.chains import create_retrieval_chain
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from dotenv import load_dotenv
import os

load_dotenv()
pdf_folder=r'googleGenAIX\backend\pdfs'
pdf_files=[f for f in os.listdir(pdf_folder) if f.endswith('.pdf')]
all_docs = []
for pdf_file in pdf_files:
    loader = PyPDFLoader(pdf_file)  
    data = loader.load()  
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000)  
    docs = text_splitter.split_documents(data) 
    all_docs.extend(docs)

len(all_docs)

vectorstore = Chroma.from_documents(documents=docs, embedding=GoogleGenerativeAIEmbeddings(model="models/embedding-001"))





