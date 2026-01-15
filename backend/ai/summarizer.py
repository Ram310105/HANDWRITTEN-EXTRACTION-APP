from transformers import pipeline

summarizer = None

def generate_summary(text):
    global summarizer

    if not text or len(text.strip()) < 30:
        return "Not enough content to summarize."

    try:
        # Load model only on first use
        if summarizer is None:
            summarizer = pipeline("summarization", model="t5-small")

        summary = summarizer(text, max_length=120, min_length=40, do_sample=False)
        return summary[0]["summary_text"]

    except Exception as e:
        print("SUMMARY ERROR:", e)
        return "Could not generate summary."
