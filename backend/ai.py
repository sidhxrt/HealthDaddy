from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_chroma import Chroma
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from dotenv import load_dotenv
import os

load_dotenv()

'''
def initialize_chroma_db():
    pdf_folder = "./std_pdfs"
    pdf_files = [f for f in os.listdir(pdf_folder) if f.endswith('.pdf')]
    
    all_docs = []
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000)
    for pdf_file in pdf_files:
        pdf_path = os.path.join(pdf_folder, pdf_file)
        loader = PyPDFLoader(pdf_path)
        data = loader.load()
        all_docs.extend(text_splitter.split_documents(data))

    vectorstore = Chroma.from_documents(
        documents=all_docs, 
        embedding=GoogleGenerativeAIEmbeddings(model="models/embedding-001"),
        persist_directory="./chroma_db"  
    )
    
    vectorstore.persist()  
    return vectorstore

def retrieverFunction(ingredients):
    vectorstore = Chroma(
        embedding_function=GoogleGenerativeAIEmbeddings(model="models/embedding-001"),
        persist_directory="./chroma_db"  
    )
    
    retriever = vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 500})  # k value is set to 10
    return retriever.invoke(ingredients)
'''

def productInfo(personInfo, ingredients):
    if (ingredients != ""):
        #standards = retrieverFunction(ingredients)
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
                #("user", "individual_dietary_preferences: {person_info}\nstandards: {standards}\ningredients: {input}"),   
                ("user", "individual_dietary_preferences: {person_info}\ningredients: {input}"),   
            ]
        )


        chain = prompt | llm | parser
        #return chain.invoke({"person_info": personInfo, "standards": standards, "input": ingredients})     
        return chain.invoke({"person_info": personInfo, "input": ingredients})     
    

    else:
        return "['couldnt fetch information for the product']" 

  









