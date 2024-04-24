import sys

print("Hello, Remote World!!!")
# text = input("Enter your first word: ")
# text2 = input("Enter your second word: ")
text = sys.stdin.readline().rstrip()
# print('Enter your first word: ')
text2 = sys.stdin.readline().rstrip()

print(text)
print(text2)