from flask import Flask, render_template, request, redirect, url_for, flash

app = Flask(__name__)
app.secret_key = 'supersecretkey'  # Necessário para usar flash messages

# Simples armazenamento de usuários para demonstração
users = {}

# Rotas
@app.route('/')
def home():
    return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if username in users and users[username] == password:
            return redirect(url_for('intro'))
        else:
            flash('Credenciais inválidas')
            return redirect(url_for('login'))
    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if username in users:
            flash('Nome de usuário já existe')
            return redirect(url_for('register'))
        else:
            users[username] = password
            flash('Registro bem-sucedido, por favor, faça login.')
            return redirect(url_for('login'))
    return render_template('register.html')

@app.route('/intro')
def intro():
    return render_template('intro.html')

@app.route('/profile')
def profile():
    return render_template('profile.html')

@app.route('/video_chat')
def video_chat():
    return render_template('video_chat.html')

@app.route('/chat')
def chat():
    return render_template('chat.html')

# Rota para login com Google
@app.route('/login/google')
def login_with_google():
    # Aqui você pode adicionar a lógica de autenticação com Google OAuth
    return "Login com Google ainda não implementado."

# Rota para login com Facebook
@app.route('/login/facebook')
def login_with_facebook():
    # Aqui você pode adicionar a lógica de autenticação com Facebook OAuth
    return "Login com Facebook ainda não implementado."

# Inicialização do servidor
if __name__ == '__main__':
    app.run(debug=True)