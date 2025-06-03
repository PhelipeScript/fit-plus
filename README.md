# FitPlus 

Aplicativo mobile para gerenciamento de treinos e acompanhamento fitness, desenvolvido em React Native com Expo. Permite criar, editar e acompanhar exercícios e treinos, oferecendo uma interface intuitiva para melhorar a rotina de atividades físicas.

## 📋 Índice

- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Modelos de Dados](#modelos-de-dados)
- [Funcionalidades Principais](#funcionalidades-principais)
- [Como Contribuir](#como-contribuir)
- [Autor](#autor)

## 🛠️ Tecnologias Utilizadas
### Frontend

- **React Native** - Framework para desenvolvimento mobile
- **Expo** - Plataforma de desenvolvimento e deployment
- **React Navigation** - Navegação entre telas
- **Context API** - Gerenciamento de estado global

### Backend

- **Firebase Authentication** - Autenticação de usuários
- **Firebase Database** - Armazenamento de dados

### Desenvolvimento

- **JavaScript/ES6+** - Linguagem principal
- **Metro** - Bundler do React Native
- **Expo CLI** - Interface de linha de comando

## 📦 📋 Pré-requisitos
Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:
### Obrigatório

- Node.js (versão 18.0 ou superior)
- npm ou yarn
- Expo CLI

### Para Desenvolvimento

- **macOS**: Necessário para desenvolvimento iOS (Xcode)
- **Windows/Linux**: Para desenvolvimento Android (Android Studio)
- Visual Studio Code (recomendado)

### Emuladores (Opcional)

- **Android Studio** - Para emulador Android
- **Xcode** - Para simulador iOS (apenas macOS)

## 🚀 Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/PhelipeScript/fit-plus.git
   cd fit-plus
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```
3. Para rodar no ambiente web do Expo (opcional), force a instalação das dependências:
    ```bash
    npm install --force
    ```

4. Configuração do Firebase

    1. Crie um projeto no Firebase Console
    2. Ative Authentication e Firestore Database
    3. Adicione suas credenciais no arquivo ***src/services/firebaseConfig.js***
    4. Lembre-se de modificar as rules do Firestore Database

5. Execute o projeto:
   ```bash
    # Inicie o servidor de desenvolvimento
    npx expo start

    # Ou usando npm script
    npm run start
   ```
6. Executar em Dispositivo

    - **Dispositivo Físico**: Instale o app Expo Go e escaneie o QR code
    - **Emulador Android**: Pressione a no terminal
    - **Simulador iOS**: Pressione i no terminal (apenas macOS)

## 🏗️ Estrutura do Projeto

O projeto está organizado da seguinte maneira:

```
fit-plus/
├── assets/
│   ├── adaptive-icon.png
│   ├── favicon.png
│   ├── icon.png
│   ├── logo.png
│   ├── splash-icon.png
│   └── splash_screen.json
├── src/
│   ├── components/
│   │   ├── Avatar/
│   │   │   ├── index.js
│   │   │   └── styles.js
│   │   ├── CustomButton/
│   │   │   ├── index.js
│   │   │   └── styles.js
│   │   ├── CustomInput/
│   │   │   ├── index.js
│   │   │   └── styles.js
│   │   ├── Divider/
│   │   │   ├── index.js
│   │   │   └── styles.js
│   │   ├── SelectInput/
│   │   │   ├── index.js
│   │   │   └── styles.js
│   │   ├── cards/
│   │   │   ├── GenericCard/
│   │   │   │   ├── index.js
│   │   │   │   └── styles.js
│   │   │   ├── InfoCard/
│   │   │   │   ├── index.js
│   │   │   │   └── styles.js
│   │   │   └── StatCard/
│   │   │       ├── index.js
│   │   │       └── styles.js
│   │   └── modals/
│   │       ├── DeleteConfirmationModal/
│   │       │   ├── index.js
│   │       │   └── styles.js
│   │       ├── ExerciseDetailsModal/
│   │       │   ├── index.js
│   │       │   └── styles.js
│   │       ├── ResetPasswordModal/
│   │       │   ├── index.js
│   │       │   └── styles.js
│   │       └── UpdateFieldModal/
│   │           ├── index.js
│   │           └── styles.js
│   ├── contexts/
│   │   ├── UserContext.js
│   │   └── WorkoutContext.js
│   ├── errors/
│   │   ├── EmailAlreadyExistsError.js
│   │   ├── InvalidCredentialError.js
│   │   ├── InvalidEmailError.js
│   │   ├── UserNotFoundError.js
│   │   └── WeakPasswordError.js
│   ├── hooks/
│   │   ├── useUser.js
│   │   └── useWorkouts.js
│   ├── navigation/
│   │   ├── AppNavigation/
│   │   │   └── index.js
│   │   ├── BottomTabsNavigation/
│   │   │   └── index.js
│   │   ├── PrivateNavigation/
│   │   │   └── index.js
│   │   └── PublicNavigation/
│   │       └── index.js
│   ├── screens/
│   │   ├── EditExercise/
│   │   │   ├── index.js
│   │   │   └── styles.js
│   │   ├── EditWorkout/
│   │   │   ├── index.js
│   │   │   └── styles.js
│   │   ├── NewExercise/
│   │   │   ├── index.js
│   │   │   └── styles.js
│   │   ├── NewWorkout/
│   │   │   ├── index.js
│   │   │   └── styles.js
│   │   ├── Profile/
│   │   │   ├── index.js
│   │   │   └── styles.js
│   │   ├── SignIn/
│   │   │   ├── index.js
│   │   │   └── styles.js
│   │   ├── SignUp/
│   │   │   ├── index.js
│   │   │   └── styles.js
│   │   ├── SplashScreen/
│   │   │   ├── index.js
│   │   │   └── styles.js
│   │   ├── WorkoutDetails/
│   │   │   ├── index.js
│   │   │   └── styles.js
│   │   ├── WorkoutMetrics/
│   │   │   ├── index.js
│   │   │   └── styles.js
│   │   └── Workouts/
│   │       ├── index.js
│   │       └── styles.js
│   ├── services/
│   │   ├── authService.js
│   │   ├── firebaseConfig.js
│   │   └── firestoreService.js
│   ├── styles/
│   │   └── theme.js
│   └── types/
│       ├── userProps.js
│       └── workoutProps.js
├── .gitignore
├── App.js
├── app.json
├── babel.config.js
├── index.js
├── metro.config.js
├── package-lock.json
└── package.json
```

## 📊 Modelos de Dados

### 👤 Usuário (User)
```javascript
  {
    uid: string;
    name: string;
    email: string;
    avatarUri?: string;
    age?: number;
    height?: number;
    weight?: number;
    phone?: string;
    gender?: 'male' | 'female' | null;
    goal?: 'gain' | 'lose' | 'maintain' | null;
    activityLevel?: 'low' | 'medium' | 'high' | null;
    createdAt?: string;
    updatedAt?: string;
  }
```

### 🏋️ Treino (Workout)
```javascript
  {
    id: string;
    name: string;
    description: string;
    frequency: 'Diariamente' | '3x por semana' | '2x por semana' | '1x por semana';
    kcal: string;
    level: 'Iniciante' | 'Intermediário' | 'Avançado';
    totalExercises: number;
    createdAt: string;
    updatedAt: string;
  }
```

### 💪 Exercício (Exercise)
```javascript
  {
    id: string;
    name: string;
    series: number;
    repetitions: number;
    weight: number;
    muscleGroup: 'Peito' | 'Costas' | 'Bíceps' | 'Tríceps' | 'Ombros' | 'Abdômen' | 'Pernas' | 'Glúteos';
    notes?: string;
    createdAt: string;
    updatedAt: string;
  }
```

### 🏋️ Sessão de Treino (Workout Session) 
```javascript
  {
    id: string;
    startedAt: string;
    endedAt?: string;
    status: 'in_progress' | 'finished';
    duration: {
        seconds: number;
        minutes: number;
        hours: number;
    };
    exercises: ExerciseSessionProps[];
  }
```

### 💪 Exercício de Sessão (Exercise Session) 
```javascript
  {
    id: string;
    name: string;
    series: number;
    repetitions: number;
    weight: number;
    muscleGroup: 'Peito' | 'Costas' | 'Bíceps' | 'Tríceps' | 'Ombros' | 'Abdômen' | 'Pernas' | 'Glúteos';
    notes?: string;
    done: boolean;
    createdAt: string;
  }
```

## 🎯 Funcionalidades Principais
### 🔐 Autenticação

- Cadastro de novos usuários
- Login com email e senha
- Recuperação de senha
- Logout seguro

### 👤 Perfil do Usuário

- Edição de informações pessoais
- Upload de foto de perfil
- Histórico de atividades

### 🏋️ Gerenciamento de Treinos

- Criação de treinos personalizados
- Adição/remoção de exercícios
- Edição de parâmetros (séries, repetições, peso)
- Categorização por grupo muscular

### 📊 Métricas e Acompanhamento

- Visualização de estatísticas de treino
- Gráficos de progresso
- Histórico de sessões

## 🤝 Como Contribuir
Contribuições são sempre bem-vindas! Para contribuir:

1. **Fork** o projeto
2. Crie uma **branch** para sua feature (git checkout -b feature/AmazingFeature)
3. **Commit** suas mudanças (git commit -m 'Add some AmazingFeature')
4. **Push** para a branch (git push origin feature/AmazingFeature)
5. Abra um **Pull Request**

### 📝 Diretrizes de Contribuição

- Siga os padrões de código existentes
- Atualize a documentação quando necessário
- Use mensagens de commit descritivas

## 🐛 Problemas Conhecidos

- Expo Web: Algumas funcionalidades podem ter limitações na versão web

## 👨‍💻 Autor
    Phelipe Pereira
