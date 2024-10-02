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
pdf_folder = r"C:\Users\nikit\OneDrive\Desktop\genai\googleGenAIX\backend\pdfs"
pdf_files = [f for f in os.listdir(pdf_folder) if f.endswith('.pdf')]
all_docs = [] 

for pdf_file in pdf_files:
    pdf_path = os.path.join(pdf_folder, pdf_file)  
    loader = PyPDFLoader(pdf_path)  
    data = loader.load()  
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000) 
    docs = text_splitter.split_documents(data)  
    all_docs.extend(docs)  

vectorstore = Chroma.from_documents(documents=all_docs, embedding=GoogleGenerativeAIEmbeddings(model="models/embedding-001"))

retriever = vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 500})
retrieved_docs=retriever.invoke(r"CHOCO CREME (38.0 ANS Jo {Jl SOLIDS, EMULSIFIER [LECITHIN (FROM SOYABEA &\Sous Suir facriow non a WHEAT FLOUR), HYDROGENATED VEGETABLE A a o=RAISING AGENTS (INS 503(i) INS 500(i INS 4 : bisODIZED SALT, NATURE IDENTICAL FLAVOUR ede L L BF 150, INS 150), EMULSIFIERS [LECITHIN (FROM SOYABEAN), MONO AN te ACIDS (FROM PALM OIL)), ARTIFICIAL FLAVOURIN BSTANS X, VANILLA a CONTAINS WHEAT, MILK, SOY. MAY CONTAIN NUT,SULPHITE H")
print(retrieved_docs)
llm = ChatGoogleGenerativeAI(model="gemini-1.5-pro", temperature=0.2, max_tokens=None, timeout=None)



def productInfo(person_info, ingredients):
    if (ingredients != ""):
        parser = StrOutputParser()
        llm = ChatGoogleGenerativeAI(model="gemini-1.5-pro", temperature=0.2, max_toxens=500)
        system_prompt = (
            "As a certified nutritionist, you are to evaluate a specific food product based on the following standards."
            "I will provide information about an individual's dietary preferences and a list of ingredients for the product in question. "
            "Please compare the ingredient list with the established standards and provide the following in the exact format specified:"
            "safety_score = [one percentage value in array],"
            "caution_message = ['caution message'],"
            "short_term_effects = ['effect1', 'effect2', 'effect3'],"
            "long_term_effects = ['effect1', 'effect2', 'effect3'],"
            "environmental_score = [one percentage value in array]"
            "If any of the information is not available, please return 'N/A' or 'None.'"
        )
        prompt = ChatPromptTemplate.from_messages(
            [
                ("system", system_prompt),
                ("user", "{input}"),
            ]
        )

        chain = prompt | llm | parser
        return chain.invoke({"input": ingredients})
    
    else:
        return "['couldnt fetch information for the product']" 


  









