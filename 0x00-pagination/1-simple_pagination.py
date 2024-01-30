#!/usr/bin/env python3
"""
This module defines a Simple helper function
"""

import csv
import math
from typing import List, Tuple


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def index_range(self, page: int, page_size: int) -> Tuple[int, int]:
        """
        index_range that takes two integer arguments page and page_size
        """
        if page <= 0 or page_size <= 0:
            return None

        start_index = (page - 1) * page_size
        end_index = start_index + page_size

        return start_index, end_index

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """
        takes two integer arguments page with default value 1
            and page_size with default value 10.
        """
        mes1 = "Page must be an integer greater than 0"
        mes2 = "Page size must be an integer greater than 0"
        assert isinstance(page, int) and page > 0, mes1
        assert isinstance(page_size, int) and page_size > 0, mes2

        dataset = self.dataset()
        start_index, end_index = self.index_range(page, page_size)

        if start_index >= len(dataset):
            return []

        return dataset[start_index:end_index]
