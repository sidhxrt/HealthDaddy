from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from dotenv import load_dotenv

load_dotenv()

def extract_keyword(person_info, ingredients, standards):
    if (ingredients != ""):
        parser = StrOutputParser()
        llm = ChatGoogleGenerativeAI(model="gemini-1.5-pro", temperature=0.2, max_toxens=500)
        system_prompt = (
            "As a certified nutritionist, you are to evaluate a specific food product based on the following standards."
            "I will provide information about an individual's dietary preferences and a list of ingredients for the product in question. "
            "Please compare the ingredient list with the established standards and provide the following in the exact format specified:"
            "safety_score = [integer value],"
            "caution_message = ['caution message'],"
            "short_term_effects = ['effect1', 'effect2', 'effect3'],"
            "long_term_effects = ['effect1', 'effect2', 'effect3'],"
            "environmental_score = [integer value]"
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



 





