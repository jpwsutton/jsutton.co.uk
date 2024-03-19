---
date: "2015-09-25T21:37:00Z"
description: ""
draft: false
slug: the-monty-hall-problem-in-python
title: The Monty Hall problem in python
cover:
  image: cover.jpg
---


The Monty Hall problem has annoyed me for a while. Not that I didn't understand it, the wiki page (http://en.wikipedia.org/wiki/Monty_Hall_problem) is quite extensive and explains it quite nicely, the problem is that I could never truely believe that by switching door, your chances of winning are 2/3 instead of 1/3 if you stick.

So I decided to test it.

And you know what, it's true!
<?prettify?>
```
#!/usr/bin/python
from random import randint

# Monty Hall Problem Simulator
# jsutton.co.uk 2014
#
# This Python script simulates the Monty Hall Problem
# http://en.wikipedia.org/wiki/Monty_Hall_problem
# Modify 'runs' to change the number of iterations

# Door Key
# 0: Goat
# 1: Car
# 2: Removed Door

###### Functions ######

# Generate the three doors
def generate_doors():  
    doors = [0,0,0]
    winning_door = randint(0,2)
    doors[winning_door] = 1
    return doors

# Return the index of the alternative door once
# one has been chosen, and one removed
def get_alternative_door(door_array, selected_door):  
    for door_index, door in enumerate(door_array):
        if door_index is not selected_door:
            if door is not 2:
                return door_index

# Return True or False if the selected door
# Is a winning door
def is_door_winner(door_array, selected_door):  
    door_result = door_array[selected_door]
    if door_result is 0:
        return False
    elif door_result is 1:
        return True
    else:
        print("Something Strange Happened: ", door_result)
        return False

# Returns True if swapping would have won
def monty_cycle():  
    doors = generate_doors()
    selected_door = randint(0,2)
    door_removed = False
    while door_removed is False:
        for door_index, door in enumerate(doors):
            if door_index is not selected_door:
                if door is 0:
                    rand = randint(0,1)
                    if rand is 1:
                        doors[door_index] = 2
                        door_removed = True
                        break

    alternative_door = get_alternative_door(doors, selected_door)
    original_door_winner = is_door_winner(doors, selected_door)
    swapped_door_winner = is_door_winner(doors, alternative_door)
    return swapped_door_winner

if __name__ == "__main__":  
    results = []
    runs = 100
    for i in range(runs):
        result = monty_cycle()
        results.append(result)

    total_success = sum(results)
    total_failure = runs - total_success
    tsp = (total_success / runs) * 100
    tfp = (total_failure / runs) * 100

    print("Total Runs: ", runs)
    print("Runs that won by swapping: ", total_success)
    print("Runs that won by staying: ", total_failure)
    print("Swap success: ", tsp, "%")
    print("Stay success: ", tfp, "%" )

```
Nothing complicated, it just generates a set of doors, sets a random door to be winner and then selects the 'chosen' door. Once the door has been chosen, a door is 'removed'. Then we look at whether switching would have resulted in a Win or a loss. 
(True indicates switching would have won, whereas False indicates that staying would have won).

I did this for 100 runs and got this:

<?prettify?>
```
Total Runs:  100  
Runs that won by swapping:  67  
Runs that won by staying:  33  
Swap success:  67.0 %  
Stay success:  33.0 %  
```

Welp. I guess that settles it then!

