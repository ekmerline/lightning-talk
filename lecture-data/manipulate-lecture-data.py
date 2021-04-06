import json

f = open('hackbright-lectures.json',)
lectures = json.load(f)

def set_of_lecturers():
    lecturers = []
    for lecture in lectures:
        lecturers.extend(lecture['lecturers'])
    return set(lecturers)

def lectures_by_lecturer_dict():
    lecturers_set = set_of_lecturers()
    lecturers_dict = {}
    for lecturer in lecturers_set:
        lecturers_dict[lecturer] = []

    for lecture in lectures:
        for lecturer in lecture['lecturers']:
            lecturers_dict[lecturer].append(lecture)
    return lecturers_dict

def print_formatted_lecture(lecture):
    print(f"Week: {lecture['week']}")
    print(f"Date: {lecture['date']}")
    print(f"Title: {lecture['date']}")
    print(f"Link: {lecture['link']}")
    print(f"Description: {lecture['description']}")
    print(f"Lecturers: {lecture['lecturers']}")
    print("Resources: ")
    if 'handout' in lecture['resources']:
        print(f"Handout: {lecture['resources']['handout']}")
    if 'demo' in lecture['resources']:
        print(f"Demo: {lecture['resources']['demo']}")
    if 'resource' in lecture['resources']:
        print(f"Resource: {lecture['resources']['resource']}")
    print("**********************************************************")

def lectures_by_lecturer(lecturer):
    for lecture in lectures_by_lecturer_dict()[lecturer]:
        print_formatted_lecture(lecture)

lectures_by_lecturer('Perficient')