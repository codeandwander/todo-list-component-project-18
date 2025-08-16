import unittest
from todo_app import TodoApp, TodoItem, TodoList

class TestTodoApp(unittest.TestCase):

    def setUp(self):
        """Set up a TodoApp instance for testing."""
        self.app = TodoApp()
        self.todo_list = TodoList()

    def test_add_todo_item(self):
        """Test adding a TodoItem to the TodoList."""
        item = TodoItem("Buy groceries")
        self.todo_list.add_item(item)
        self.assertIn(item, self.todo_list.items)

    def test_remove_todo_item(self):
        """Test removing a TodoItem from the TodoList."""
        item = TodoItem("Buy groceries")
        self.todo_list.add_item(item)
        self.todo_list.remove_item(item)
        self.assertNotIn(item, self.todo_list.items)

    def test_mark_item_as_completed(self):
        """Test marking a TodoItem as completed."""
        item = TodoItem("Buy groceries")
        self.todo_list.add_item(item)
        item.mark_as_completed()
        self.assertTrue(item.completed)

    def test_integration_todo_app(self):
        """Test the integration of TodoApp and TodoList."""
        self.app.add_item("Buy groceries")
        self.app.add_item("Walk the dog")
        self.app.complete_item("Buy groceries")
        
        self.assertEqual(len(self.app.todo_list.items), 2)
        self.assertTrue(self.app.todo_list.items[0].completed)

    def tearDown(self):
        """Clean up after each test."""
        self.app = None
        self.todo_list = None

if __name__ == '__main__':
    unittest.main()