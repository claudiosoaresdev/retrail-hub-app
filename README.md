# Retail Hub

Retail Hub é um aplicativo de pedidos de varejo digital, desenvolvido em React Native, que permite aos usuários navegarem, selecionarem e finalizarem pedidos de produtos. O aplicativo é estruturado com uma arquitetura bem organizada e utiliza diversas tecnologias para lidar com navegação, gerenciamento de estado, formulários, cache, e simulação de API.

## Tecnologias Utilizadas

### 1. Estrutura do Projeto

A estrutura do projeto é organizada de forma modular para facilitar a manutenção e escalabilidade. As principais pastas são:

- atomic: Componentes reutilizáveis e estilizados, organizados em átomos, moléculas e organismos.
- domain: Responsável por organizar as regras de negócios, com funcionalidades divididas por módulos (auth, orders, products).
- hooks: Custom hooks para funcionalidades específicas, como tema e área segura.
infra: Contém funcionalidades de infraestrutura, como paginação.
- navigation: Configuração de navegação do aplicativo, incluindo stacks e drawers.
- screens: Telas principais do aplicativo, organizadas por contexto.
- services: Serviços de API, autenticação e armazenamento.
- store: Gerenciamento de estado global com Zustand.
- themes: Definições de cores e temas para estilização.
- utils: Utilitários auxiliares.

### 2. Gerenciamento de Estado

- Zustand: Utilizado para gerenciar o estado global do aplicativo de forma simples e eficiente. A pasta store contém a configuração de estado do carrinho, encapsulada em useCartZustand.

### 3. Gestão de Cache

- React Query: Facilita o cache e sincronização de dados de API, melhorando a experiência do usuário ao lidar com dados remotos. Utilizado para cache de dados de produtos e pedidos.

### 4. Cliente HTTP

- Axios: Cliente HTTP utilizado para realizar chamadas à API. A configuração do Axios está centralizada na pasta services/api, permitindo fácil customização de headers e interceptores.

### 5. Navegação

- React Navigation: Biblioteca de navegação utilizada para gerenciar as telas e fluxos do aplicativo, com suporte para navegação em stack e drawer. As configurações principais estão na pasta navigation.

### 6. Formulários e Validação

- React Hook Form: Gerencia formulários de forma eficiente, com suporte a validação e performance otimizada.
Zod: Biblioteca de validação de dados, utilizada em conjunto com o React Hook Form para validar entradas do usuário.

### 7. Animações

- React Native Reanimated: Biblioteca utilizada para animações suaves e performáticas, melhorando a experiência visual do usuário.

### 8. Armazenamento

- Async Storage: Utilizado para persistir dados localmente no dispositivo do usuário, como tokens de autenticação e preferências de usuário.

### 9. Mock de API

- MirageJS: Simula uma API local para desenvolvimento e testes, permitindo testar funcionalidades sem depender de uma API real.

### 10. Estilização

- Restyle: Biblioteca de estilização utilizada para criar uma experiência visual coesa e reativa. O sistema de temas e cores é configurado na pasta themes.

## Estrutura do Código

```plaintext
src
├── atomic
│   ├── atoms          # Componentes básicos (ex: Botão, Texto)
│   ├── molecules      # Componentes compostos (ex: Entrada de Formulário)
│   └── organisms      # Componentes organizacionais (ex: Resumo do Carrinho)
├── domain
│   ├── auth           # Regras de negócios de autenticação
│   ├── orders         # Regras de negócios de pedidos
│   └── products       # Regras de negócios de produtos
├── hooks              # Custom hooks
├── infra              # Infraestrutura (ex: paginação)
├── navigation         # Configuração de navegação
├── screens            # Telas do aplicativo
├── services           # Serviços de API, autenticação e configurações
├── store              # Gerenciamento de estado com Zustand
├── themes             # Configurações de tema e cores
└── utils              # Funções utilitárias
```

## Injeção de Dependências

No projeto "Retail Hub", a injeção de dependências é usada para tornar o código mais flexível, facilitando a troca de implementações de serviços e permitindo melhor testabilidade. Isso é feito, por exemplo, no serviço de armazenamento (`storageService`) que utiliza a implementação `asyncStorage` para persistir dados.

**Exemplo de Implementação**: `StorageService`

No exemplo abaixo, `StorageService` é uma interface que define os métodos esperados de um serviço de armazenamento: `getItem`, `setItem` e `removeItem`. A implementação padrão é `asyncStorage`, que usa o Async Storage do React Native.

Código do Serviço de Armazenamento (`storageService.ts`):

```typescript
import { asyncStorage } from "./implementations/asyncStorage";

export interface StorageService {
  getItem: <T>(key: string) => Promise<T | null>;
  setItem: <T>(key: string, value: T) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
}

export let storageService: StorageService = asyncStorage;

export function initializeStorage(storage: StorageService) {
  storageService = storage;
}
```

A função `initializeStorage` permite substituir a implementação padrão (`asyncStorage`) por outra implementação. Isso é útil para testes, onde você pode passar um mock ou uma implementação alternativa sem modificar o código de produção.

Implementação de asyncStorage (`asyncStorage.ts`):

```typescript
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageService } from "../storageService";

export const asyncStorage: StorageService = {
  getItem: async (key: string) => {
    const item = await AsyncStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },
  setItem: async (key: string, value: any) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: async (key: string) => {
    await AsyncStorage.removeItem(key);
  },
};
```

Essa implementação usa `@react-native-async-storage/async-storage` para manipular dados no armazenamento local.

**Inicialização da Dependência**

No arquivo principal (App.tsx), `initializeStorage` é chamado para definir a implementação de `storageService`. Caso precise, você pode substituir `asyncStorage` por uma implementação alternativa.

```typescript
import { initializeStorage } from './src/services/storage/storageService';
import { asyncStorage } from './src/services/storage/implementations/asyncStorage';

initializeStorage(asyncStorage);
```

Ao usar `initializeStorage`, o projeto pode configurar o serviço de armazenamento na inicialização do aplicativo, proporcionando flexibilidade para alterar a implementação sem modificar o restante do código que depende de `storageService`.

### Implementação Alternativa com `react-native-mmkv`

O `react-native-mmkv` fornece uma alternativa performática ao `AsyncStorage` do React Native, sendo ideal para armazenar dados em cache ou informações frequentemente acessadas.

**Código de Implementação com `react-native-mmkv` (`MMKVStorage.ts`)**:

```typescript
import { MMKV } from 'react-native-mmkv';
import { StorageService } from '../storageService';

const MMKVInstance = new MMKV();

export const MMKVStorage: StorageService = {
  getItem: (key) => {
    const item = MMKVInstance.getString(key);
    return item ? JSON.parse(item) : null;
  },
  setItem: async (key, value) => {
    MMKVInstance.set(key, JSON.stringify(value));
  },
  removeItem: async (key) => {
    MMKVInstance.delete(key);
  },
};
```

Neste exemplo, `MMKVInstance` é uma instância do armazenamento `MMKV`. O método `getItem` retorna o valor armazenado como uma string JSON parseada, enquanto `setItem` e `removeItem` fazem a gravação e exclusão de dados no armazenamento.

**Substituição da Implementação de Armazenamento**

Para usar o `MMKVStorage` como a implementação ativa no seu aplicativo, basta passá-lo como parâmetro para a função `initializeStorage`.

Exemplo de Inicialização no Arquivo `App.tsx`:

```typescript
import { initializeStorage } from './src/services/storage/storageService';
import { MMKVStorage } from './src/services/storage/implementations/MMKVStorage';

initializeStorage(MMKVStorage);
```

Ao fazer isso, `MMKVStorage` será a implementação ativa para o serviço de armazenamento, substituindo `asyncStorage`. Essa abordagem permite trocar facilmente entre asyncStorage e `MMKVStorage` sem alterar o restante do código que depende de `storageService`.

### Vantagens da Injeção de Dependências com Implementações Alternativas

A flexibilidade de injetar diferentes implementações de `StorageService` permite ao aplicativo "Retail Hub" escolher a melhor estratégia de armazenamento conforme o ambiente:

- **Desenvolvimento e Testes**: Pode-se usar `asyncStorage` ou um mock.
- **Produção**: `MMKVStorage` para melhorar a performance.

Essa modularidade torna o aplicativo mais adaptável e facilita futuras manutenções e otimizações.