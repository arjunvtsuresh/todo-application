from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app,resources={r"/api/*": {"origins": "*"}})

# In-memory storage for todos
todos = []
todo_id = 1

# Get all todos
@app.route('/api/todos', methods=['GET'])
def get_todos():
    return jsonify(todos)

# Add a new todo
@app.route('/api/todos', methods=['POST'])
def add_todo():
    global todo_id
    data = request.json
    if 'title' not in data:
        return jsonify({'error': 'Title is required'}), 400
    
    new_todo = {
        'id': todo_id,
        'title': data['title'],
        'completed': False
    }
    todos.append(new_todo)
    todo_id += 1
    return jsonify(new_todo), 201

# Delete a todo
@app.route('/api/todos/<int:id>', methods=['DELETE'])
def delete_todo(id):
    global todos
    todos = [todo for todo in todos if todo['id'] != id]
    return jsonify({'message': 'Todo deleted'}), 200

# Toggle todo completion
@app.route('/api/todos/<int:id>', methods=['PUT'])
def toggle_todo(id):
    for todo in todos:
        if todo['id'] == id:
            todo['completed'] = not todo['completed']
            return jsonify(todo)
    return jsonify({'error': 'Todo not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)
