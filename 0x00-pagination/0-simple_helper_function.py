#!/usr/bin/env python3
"""
This module defines a Simple helper function
"""


def index_range(page, page_size):
    """
    index_range that takes two integer arguments page and page_size
    """
    if page <= 0 or page_size <= 0:
        return None
    
    start_index = (page - 1) * page_size
    end_index = start_index + page_size

    return start_index, end_index
