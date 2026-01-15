import re

def clean_text(text):
    """
    Cleans and formats OCR extracted text.
    
    Parameters:
        text (str): Raw OCR output.
    
    Returns:
        str: Cleaned and readable text.
    """

    if not text:
        return ""

    # Remove multiple spaces
    text = re.sub(r'\s+', ' ', text)

    # Replace weird OCR artefacts
    text = re.sub(r'[^\w\s.,!?-]', '', text)

    # Add proper newlines after punctuation
    text = re.sub(r'([.!?]) ', r'\1\n', text)

    # Trim extra whitespace
    text = text.strip()

    return text
