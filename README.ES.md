# meAhorro - Aplicación de Gestión Financiera Personal

Esta aplicación, construida con **Ionic** y **Angular**, permite a los usuarios gestionar sus finanzas personales de forma sencilla. A continuación, se detallan las funcionalidades por sección.

---

## 📱 Pantalla Principal

### Funcionalidades y Componentes

Muestra una visión general del estado financiero del usuario.

- **Tarjeta de Ingresos**: Muestra el total de ingresos registrados. Al tocarla, permite ver y agregar más detalles.
- **Tarjeta de Gastos**: Muestra el total de gastos. Al tocarla, permite gestionarlos.
- **Tarjeta de Saldo**: Indica el dinero disponible.

---

## 💸 Página de Gastos

Permite registrar y visualizar los gastos.

### Agregar Gasto:
- Ingreso del monto, categoría, fecha y notas opcionales.
- Botón para guardar el gasto, que se almacena localmente en el navegador.

### Lista de Gastos:
- Muestra los gastos registrados con su información detallada.
- Funciones de **Editar** y **Eliminar** cada gasto.

---

## 💰 Página de Ingresos

Permite gestionar los ingresos recibidos.

### Formulario para Agregar Ingresos:
- Monto, fuente (Salario, Freelance, Otros), fecha y botón para agregar.

### Lista de Ingresos Registrados:
- Visualización del ingreso con monto, fuente y fecha.
- Opciones para **Eliminar** y **Editar**.

---

## 📊 Página de Presupuestos

Gestión de asignaciones financieras por categoría.

### Formulario para Agregar Presupuestos:
- Categoría presupuestaria y monto asignado.

### Lista de Presupuestos:
- Visualiza todos los presupuestos creados.
- Opciones para **Eliminar** y **Editar**.

---

## 📈 Página de Informes

Visualización gráfica de ingresos y gastos.

- **Gastos por Categoría**: Distribución por categorías.
- **Gastos por Mes**: Evolución mensual.
- **Comparación de Ingresos y Gastos**: Evaluación del equilibrio financiero.

---

## ⚙️ Página de Configuración

### Personalización de Categorías:
- Añadir nuevas categorías de gasto.

### Notificaciones:
- Activar/desactivar alertas de gastos y recordatorios de presupuesto.

### Idioma y Moneda:
- Selección de idioma (Español o Inglés) y moneda (USD, EUR, MXN).

---

## 🛠️ Pasos de Instalación

1. Instalar Node.js (recomendado: 20.18.0)
2. Instalar el CLI de Ionic:
    ```bash
    npm install -g @ionic/cli
    ```
3. Instalar Angular CLI:
    ```bash
    npm install -g @angular/cli
    ```
4. Clonar el repositorio:
    ```bash
    git clone https://github.com/vmartinez16/Gestor-de-gastos-personales
    ```
5. Navegar a la carpeta del proyecto.
6. Instalar dependencias:
    ```bash
    npm install
    ```
7. Sincronizar el proyecto:
    ```bash
    ionic capacitor sync
    ```
8. Abrir en Android Studio o Xcode:
    ```bash
    ionic cap open android
    ionic cap open ios
    ```
9. Ejecutar la aplicación y ¡listo!
