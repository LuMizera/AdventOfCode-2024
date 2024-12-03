package main

import (
	"bufio"
	"fmt"
	"os"
	"sort"
	"strconv"
	"strings"
)

func main() {
	slice1, slice2, err := readInput("./input.txt")
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	// Sort both slices
	sort.Ints(slice1)
	sort.Ints(slice2)

	// Calculate the result using integer operations
	result := calculateDifference(slice1, slice2)

	// Print the result as an integer
	fmt.Println(result)
}

func readInput(filePath string) ([]int, []int, error) {
	file, err := os.Open(filePath)
	if err != nil {
		return nil, nil, fmt.Errorf("error opening file: %w", err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)

	var slice1, slice2 []int

	for scanner.Scan() {
		parts := strings.Fields(scanner.Text()) // Automatically handles all whitespace

		for i, part := range parts {
			num, err := strconv.Atoi(part)
			if err != nil {
				return nil, nil, fmt.Errorf("error converting string to int: %w", err)
			}

			// Append to slice1 or slice2 based on index
			if i == 0 {
				slice1 = append(slice1, num)
			} else {
				slice2 = append(slice2, num)
			}
		}
	}

	if err := scanner.Err(); err != nil {
		return nil, nil, fmt.Errorf("error reading file: %w", err)
	}

	return slice1, slice2, nil
}

func calculateDifference(slice1, slice2 []int) int {
	result := 0

	for i := 0; i < len(slice1); i++ {
		// Compute the absolute difference
		if slice1[i] > slice2[i] {
			result += slice1[i] - slice2[i]
		} else {
			result += slice2[i] - slice1[i]
		}
	}

	return result
}
