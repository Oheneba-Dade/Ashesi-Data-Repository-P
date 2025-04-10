import os 

def extract_filename(url):
    return url.split("-")[-1]


def rename(filename):
    return filename.replace('-', '_')