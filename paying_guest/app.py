from flask import Flask, render_template, request, jsonify
import json

app = Flask(__name__)

# Load room data from JSON file
with open('data/rooms.json') as f:
    rooms = json.load(f)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/rooms')
def rooms_view():
    return render_template('rooms.html', rooms=rooms)

@app.route('/filter_rooms', methods=['GET'])
def filter_rooms():
    location = request.args.get('location')
    beds = request.args.get('beds')
    filtered_rooms = [room for room in rooms if room['location'] == location and room['beds'] == int(beds)]
    return jsonify(filtered_rooms)

@app.route('/facilities')
def facilities():
    return render_template('facilities.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        message = request.form['message']
        # Process the contact form (e.g., save to database or send email)
        return render_template('contact.html', success=True)
    return render_template('contact.html')

if __name__ == '__main__':
    app.run(debug=True)
