from flask import Flask,request, jsonify
from bubbleSort import BubbleSort
app = Flask(__name__)
app.config["DEBUG"] = True
global array 
array = []

@app.route('/array', methods=['GET'])
def api_array():
    return jsonify(array)

@app.route('/add_array', methods=['POST'])
def add_array():
    new_data = request.get_json()
    print(type(new_data))
    print(new_data)
    array.append(int(new_data))
    return jsonify(array)

@app.route('/clear_array', methods=['POST'])
def clear_array():
    array.clear()
    return jsonify(array)

@app.route('/sort_array', methods=['POST'])
def sort_array():
    new_data = request.get_json()
    print(type(new_data))
    print(new_data)
    print("="*10)
    BubbleSort(new_data)
    print(new_data)
    array.clear()
    for i in range (len(new_data)):
         array.append(new_data[i])
         
    print(array)
    return jsonify(array)


if __name__ == "__main__":
    app.run()
