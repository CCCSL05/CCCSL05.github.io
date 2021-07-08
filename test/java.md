## Java快速入门

### Java简介

Java最早是由SUN公司（已被Oracle收购）的[詹姆斯·高斯林](https://en.wikipedia.org/wiki/James_Gosling)（高司令，人称Java之父）在上个世纪90年代初开发的一种编程语言，最初被命名为Oak。

#### Java特点

- Java是基于JVM虚拟机的跨平台语言，一次编写，到处运行；
- Java程序易于编写，而且有内置垃圾收集，不必考虑内存管理；

- Java介于编译型语言和解释型语言之间。

- 编译型语言如C、C++，代码是直接编译成机器码执行，但是不同的平台（x86、ARM等）CPU的指令集不同，因此，需要编译出每一种平台的对应机器码。

- 解释型语言如Python、Ruby没有这个问题，可以由解释器直接加载源码然后运行，代价是运行效率太低。

- 而Java是将代码编译成一种“字节码”，它类似于抽象的CPU指令，然后，针对不同平台编写虚拟机，不同平台的虚拟机负责加载字节码并执行，这样就实现了“一次编写，到处运行”的效果。*当然，这是针对Java开发者而言。对于虚拟机，需要为每个平台分别开发。为了保证不同平台、不同公司开发的虚拟机都能正确执行Java字节码，SUN公司制定了一系列的Java虚拟机规范。从实践的角度看，JVM的兼容性做得非常好，低版本的Java字节码完全可以正常运行在高版本的JVM上。*

#### JavaSE，JavaEE，JavaME

- Java SE： Standard Edition，标准版，包含标准的JVM和标准库，
- Java EE： Enterprise Edition，企业版，它只是在Java SE的基础上加上了大量的API和库，以便方便开发Web应用、数据库、消息服务等，Java EE的应用使用的虚拟机和Java SE完全相同。
- Java ME： Micro Edition，Java ME就和Java SE不同，它是一个针对嵌入式设备的“瘦身版”，Java SE的标准库无法在Java ME上使用，Java ME的虚拟机也是“瘦身版”。

#### 名词解释

- JDK： Java Development Kit
- JRE： Java Runtime Environment

```ascii
  ┌─    ┌──────────────────────────────────┐
  │     │     Compiler, debugger, etc.     │
  │     └──────────────────────────────────┘
 JDK ┌─ ┌──────────────────────────────────┐
  │  │  │                                  │
  │ JRE │      JVM + Runtime Library       │
  │  │  │                                  │
  └─ └─ └──────────────────────────────────┘
        ┌───────┐┌───────┐┌───────┐┌───────┐
        │Windows││ Linux ││ macOS ││others │
        └───────┘└───────┘└───────┘└───────┘
```

#### Java相关命令

- java：这个可执行程序其实就是JVM，运行Java程序，就是启动JVM，然后让JVM执行指定的编译后的代码；
- javac：这是Java的编译器，它用于把Java源码文件（以`.java`后缀结尾）编译为Java字节码文件（以`.class`后缀结尾）；
- jar：用于把一组`.class`文件打包成一个`.jar`文件，便于发布；
- javadoc：用于从Java源码中自动提取注释并生成文档；
- jdb： Java调试器，用于开发阶段的运行调试。

#### 第一个程序的运行

```java
// Hello.java
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, world!");
    }
}
```

Java源码本质上是一个文本文件，我们需要先用`javac`把`Hello.java`编译成字节码文件`Hello.class`，然后，用`java`命令（在JVM上）执行这个字节码文件

```shell
javac Hello.java # 编译成字节码.class文件
java Hello # 在JVM上执行生成的Hello.class文件，
java Hello.java # 带.java后缀也可以运行
```

> 小总结：
>
> 一个Java源码只能定义一个`public`类型的class，并且class名称和文件名要完全一致；
>
> 使用`javac`可以将`.java`源码编译成`.class`字节码；
>
> 使用`java`可以运行一个已编译的Java程序，参数是类名。
>
> 不写`public`，也能正确编译，但是这个类将无法从命令行执行（java Hello）。

### Java程序基础

**变量和数据类型**

```java
// 整型
int i3 = 2_000_000_000; // 加下划线更容易识别，
int i4 = 0xff0000; // 十六进制表示的16711680
int i5 = 0b1000000000; // 二进制表示的512
long l = 9000000000000000000L; // long型的结尾需要加L
```

> 小知识：
>
> 1. Java语言对布尔类型的存储并没有做规定，因为理论上存储布尔类型只需要1 bit，但是通常JVM内部会把`boolean`表示为4字节整数。
>
> 2. 字符类型`char`表示一个字符，两个字节。Java的`char`类型保存一个Unicode字符，也可以表示标准的ASCII。
>
> 3. 常量的作用是用有意义的变量名来避免魔术数字（Magic number），例如，不要在代码中到处写`3.14`，而是定义一个常量PI，常量名通常全部大写。
> 4. 编译器会根据赋值语句自动推断出变量`sb`的类型是`StringBuilder`，因此，使用`var`定义变量，仅仅是少写了变量类型而已。

**整数运算**

> 位运算小知识：
>
> 1. 无符号的右移运算，使用`>>>`，它的特点是不管符号位，右移后高位总是补`0`，因此，对一个负数进行`>>>`右移，它会变成正数，原因是最高位的`1`变成了`0`。对`byte`和`short`类型进行移位时，会首先转换为`int`再进行位移。

**浮点数运算**

> 小知识：
>
> 1. 浮点数`0.1`在计算机中就无法精确表示，因为十进制的`0.1`换算成二进制是一个无限循环小数，很显然，无论使用`float`还是`double`，都只能存储一个`0.1`的近似值。但是，`0.5`这个浮点数又可以精确地表示。
> 2. 比较两个浮点数通常比较它们的差的绝对值是否小于一个特定值（很小的一个值，比如0.00001）；
> 3. 编译器计算`24 / 5`这个子表达式时，按两个整数进行运算，结果仍为整数`4`。

**字符和字符串**

```java
// 字符类型
int n1 = 'A'; // 字母“A”的Unicodde编码是65
int n2 = '中'; // 汉字“中”的Unicode编码是20013

// 还可以直接用转义字符\u+Unicode编码来表示一个字符：
// 注意是十六进制:
char c3 = '\u0041'; // 'A'，因为十六进制0041 = 十进制65
char c4 = '\u4e2d'; // '中'，因为十六进制4e2d = 十进制20013
// Java的字符类型char是基本类型，字符串类型String是引用类型；
```

> 小知识：
>
> 1. 因为Java在内存中总是使用Unicode表示字符，所以，一个英文字符和一个中文字符都用一个`char`类型表示，它们都占用两个字节。要显示一个字符的Unicode编码，只需将`char`类型直接赋值给`int`类型即可。
> 2. 从Java 13开始，字符串可以用`"""..."""`表示多行字符串（Text Blocks）了，多行字符串前面==共同的空格==会被去掉，总是以最短的行首空格为基准

**数组类型**

> 小知识：
>
> 1. 数组所有元素初始化为默认值，整型都是`0`，浮点型是`0.0`，布尔型是`false`；
> 2. 数组一旦创建后，大小就不可改变。

### 流程控制

**输入和输出**

```java
// 输出
System.out.println("hello"); // println是print line的缩写，表示输出并换行
System.out.print("hello");
System.out.printf("hello %s","world"); // 格式化输出

// 输入
Scanner scanner = new Scanner(System.in); // 创建Scanner对象
String name = scanner.nextLine(); // 读取一行输入并获取字符串
int age = scanner.nextInt(); // 读取一行输入并获取整数
```

> 小知识：
>
> 1. 连续两个%%表示一个%字符本身

**Switch**

```java
// java12 之后的语法
public class Main {
    public static void main(String[] args) {
        String fruit = "apple";
        switch (fruit) {
            case "apple" -> System.out.println("Selected apple");
            case "pear" -> System.out.println("Selected pear");
            case "mango" -> {
                System.out.println("Selected mango");
                System.out.println("Good choice!");
        	}
        	default -> System.out.println("No fruit selected");
        }
    }
}
////////////////////////////
// yield 返回值
String fruit = "orange";
int opt = switch (fruit) {
    case "apple" -> 1;
    case "pear", "mango" -> 2;
    default -> {
        int code = fruit.hashCode();
        yield code; // switch语句返回值
    }
};// 注意赋值语句要以;结束
System.out.println("opt = " + opt); 
```

> 小知识：
>
> 1. 从Java 12开始，`switch`语句升级为更简洁的表达式语法，使用类似模式匹配（Pattern Matching）的方法，保证只有一种路径会被执行，并且不需要`break`语句：
>
>    注意新语法使用`->`，如果有多条语句，需要用`{}`括起来。不要写`break`语句，因为新语法只会执行匹配的语句，没有穿透效应。
>
> 2. 使用新的`switch`语法，不但不需要`break`，还可以直接返回值。
>
> 3. 用`yield`返回一个值作为`switch`语句的返回值，和`return`类似

**循环**

> 小知识：
>
> 1. 如果循环条件永远满足，那这个循环就变成了死循环。死循环将导致100%的CPU占用，用户会感觉电脑运行缓慢，所以要避免编写死循环代码。
> 2. `for each`循环无法指定遍历顺序，也无法获取数组的索引。除了数组外，`for each`循环能够遍历所有“可迭代”的数据类型，包括后面会介绍的`List`、`Map`等。

### 数组操作

**遍历数组**

> 小知识：
>
> 1. 遍历数组可以使用`for`循环，`for`循环可以访问数组索引，`for each`循环直接迭代每个数组元素，但无法获取索引；
> 2. 使用`Arrays.toString()`可以快速获取数组内容。

**数组排序**

- 直接使用Java标准库提供的`Arrays.sort()`进行排序；

**多维数组**

- 打印多维数组可以使用`Arrays.deepToString()`；

## 面向对象编程

面向对象编程，英文是Object-Oriented Programming，简称OOP。

### 方法

1. 在方法内部，可以使用一个隐含的变量`this`，它始终指向当前实例。因此，通过`this.field`就可以访问当前实例的字段。

   ==如果没有命名冲突，可以省略`this`。==

### 构造方法

> 小知识：
>
> 1. 如果一个类没有定义构造方法，编译器会自动为我们生成一个默认构造方法，它没有参数，也没有执行语句。如果我们自定义了一个构造方法，那么，编译器就*不再*自动创建默认构造方法：
> 2. 没有在构造方法中初始化字段时，引用类型的字段默认是`null`，数值类型的字段用默认值，`int`类型默认值是`0`，布尔类型默认值是`false`
> 3. 在Java中，创建对象实例的时候，按照如下顺序进行初始化：
>    1. 先初始化字段，例如，`int age = 10;`表示字段初始化为`10`，`double salary;`表示字段默认初始化为`0`，`String name;`表示引用类型字段默认初始化为`null`；
>    2. 执行构造方法的代码进行初始化。

### 方法重载

> 小知识：
>
> 1. 方法名相同，但各自的参数不同，称为方法重载
>
>    方法重载的返回值类型通常都是相同的。
>
>    方法重载的目的是，功能类似的方法使用同一名字，更容易记住，因此，调用起来更简单。
>
>    - `int indexOf(int ch)`：根据字符的Unicode码查找；
>    - `int indexOf(String str)`：根据字符串查找；
>    - `int indexOf(int ch, int fromIndex)`：根据字符查找，但指定起始位置；
>    - `int indexOf(String str, int fromIndex)`根据字符串查找，但指定起始位置。

### 继承

> 小知识：
>
> 1. 继承是面向对象编程中非常强大的一种机制，它可以复用代码。
>
> 2.  ==注意：==子类自动获得了父类的所有字段和方法（包括private），严禁定义与父类重名的字段！（子类定义的重名变量会覆盖父类定义的变量）
>
> 3. 子类无法访问父类的`private`字段或者`private`方法。
>
> 4. `protected`关键字可以把字段和方法的访问权限控制在继承树内部，一个`protected`字段和方法可以被其子类，以及子类的子类所访问
>
> 5. 实际上，在子类中使用`super.name`，或者`this.name`，或者`name`，效果都是一样的。编译器会自动定位到父类的`name`字段
>
> 6. 在Java中，任何`class`的构造方法，==第一行语句必须是调用父类的构造方法==。如果没有明确地调用父类的构造方法，编译器会帮我们自动加一句`super();`
>
> 7. ==阻止继承==
>
>    正常情况下，只要某个class没有`final`修饰符，那么任何类都可以从该class继承。==`final`方法不允许子类重写。==
>
>    从`Java 15`开始，允许使用`sealed`修饰class，并通过`permits`明确写出能够从该class继承的子类名称。
>
>    `sealed`类在Java 15中目前是预览状态，要启用它，必须使用参数`--enable-preview`和`--source 15`。
>
>    ```java
>    public sealed class Shape permits Rect, Circle, Triangle {
>        // Shape类就是一个sealed类，它只允许指定的3个类继承它
>    }
>    ```
>
> 8. 子类功能比父类多，多的功能无法凭空变出来。因此，向下转型很可能会失败。
>
>    从Java 14开始，判断`instanceof`后，可以直接转型为指定变量，避免再次强制转型。
>
>    ```java
>    Object obj = "hello";
>    if (obj instanceof String s) {
>        // 可以直接使用变量s:
>        System.out.println(s.toUpperCase());
>    }
>    ```
>
> 9. 继承是is关系，组合是has关系。具有has关系不应该使用继承，而是使用组合。

### 多态 

> 小知识：
>
> 1. 多态是指，针对某个类型的方法调用，其真正执行的方法取决于运行时期实际类型的方法（动态调用）。
>
>    多态的特性就是，运行期才能动态决定调用的子类方法。对某个类型调用某个方法，执行的实际方法可能是某个子类的覆写方法。
>
> 2. Java的方法调用取决于运行期对象的实际类型，这种行为称为多态；
>
> 3. `final`关键字
>
>    1. `final`修饰的方法可以阻止被覆写；
>    2. `final`修饰的class可以阻止被继承；
>    3. `final`修饰的field必须在创建对象时初始化，随后不可修改。（可以在构造方法中初始化final字段）

### 抽象类

1. 因为抽象类本身被设计成只能用于被继承，因此，抽象类可以强迫子类实现其定义的抽象方法，否则编译会报错。因此，抽象方法实际上相当于定义了“规范”。
2. `Person e = new Employee();`这种尽量引用高层类型，避免引用实际子类型的方式，称之为==面向抽象编程==。
3. 面向抽象编程使得调用者只关心抽象方法的定义，不关心子类的具体实现。

### 接口

> 小知识：
>
> 1. 所谓`interface`，就是比抽象类还要抽象的纯抽象接口，因为它连字段都不能有（只是定义方法规范）。因为接口定义的所有方法默认都是`public abstract`的，所以这两个修饰符不需要写出来（写不写效果都一样）。
> 2. 一般来说，公共逻辑适合放在`abstract class`中，具体逻辑放到各个子类，而接口层次代表抽象程度
>
> ```ascii
> ┌───────────────┐
> │   Iterable    │
> └───────────────┘
>         ▲                ┌───────────────────┐
>         │                │      Object       │
> ┌───────────────┐        └───────────────────┘
> │  Collection   │                  ▲
> └───────────────┘                  │
>         ▲     ▲          ┌───────────────────┐
>         │     └──────────│AbstractCollection │
> ┌───────────────┐        └───────────────────┘
> │     List      │                  ▲
> └───────────────┘                  │
>               ▲          ┌───────────────────┐
>               └──────────│   AbstractList    │
>                          └───────────────────┘
>                                 ▲     ▲
>                                 │     │
>                                 │     │
>                      ┌────────────┐ ┌────────────┐
>                      │ ArrayList  │ │ LinkedList │
>                      └────────────┘ └────────────┘
> ```
>
> 3. 在接口中，可以定义`default`方法（JDK>=1.8）。实现类可以不必覆写`default`方法。`default`方法的目的是，当我们需要给接口新增一个方法时，会涉及到修改全部子类。如果新增的是`default`方法，那么子类就不必全部修改，只需要在需要覆写的地方去覆写新增方法。
>
>    `default`方法和抽象类的普通方法是有所不同的（但是差不多）。因为`interface`没有字段，`default`方法无法访问字段，而抽象类的普通方法可以访问实例字段。

### 静态字段和静态方法

1. 静态方法类似其它编程语言的函数。静态方法常用于工具类和辅助方法。
2. 因为静态方法属于`class`而不属于实例，因此，静态方法内部，无法访问`this`变量，也无法访问实例字段，它只能访问静态字段。
3. 因为`interface`是一个纯抽象类，所以它不能定义实例字段。但是，`interface`是可以有静态字段的，并且静态字段必须为`final`类型。实际上，因为`interface`的字段只能是`public static final`类型，所以我们可以把这些修饰符都去掉，编译器会自动把该字段变为`public static final`类型。

### 包

1. 不用`public`、`protected`、`private`修饰的字段和方法就是包作用域。
2. 还有一种`import static`的语法，它可以导入可以导入一个类的静态字段和静态方法
3. 一个`.java`文件只能包含一个`public`类，但可以包含多个非`public`类。如果有`public`类，文件名必须和`public`类的名字相同

Java编译器最终编译出的`.class`文件只使用*完整类名*，因此，在代码中，当编译器遇到一个`class`名称时：

- 如果是完整类名，就直接根据完整类名查找这个`class`；
- 如果是简单类名，按下面的顺序依次查找：
  - 查找当前`package`是否存在这个`class`；
  - 查找`import`的包是否包含这个`class`；
  - 查找`java.lang`包是否包含这个`class`。编译器会自动导入JDK的核心类使用的`java.lang`包

### 内部类

1. Inner Class可以修改Outer Class的`private`字段，因为Inner Class的作用域在Outer Class内部，所以能访问Outer Class的`private`字段和方法。
2. 观察Java编译器编译后的`.class`文件可以发现，`Outer`类被编译为`Outer.class`，而`Inner`类被编译为`Outer$Inner.class`。实例化一个Inner Class不能脱离Outer实例。

定义==匿名类==的写法如下：

```java
Runnable r = new Runnable() {
    // 实现必要的抽象方法...
};
```

观察Java编译器编译后的`.class`文件可以发现，`Outer`类被编译为`Outer.class`，而匿名类被编译为`Outer$1.class`。如果有多个匿名类，Java编译器会将每个匿名类依次命名为`Outer$1`、`Outer$2`、`Outer$3`……

### classpath和jar

> 小知识：
>
> 1. 我们强烈*不推荐*在系统环境变量中设置`classpath`，那样会污染整个系统环境。在启动JVM时设置`classpath`才是推荐的做法。实际上就是给`java`命令传入`-classpath`或`-cp`参数：
>
>    ```shell
>    java -classpath .;C:\work\project1\bin;C:\shared abc.xyz.Hello
>    ```
>
> 2. 没有设置系统环境变量，也没有传入`-cp`参数，那么JVM默认的`classpath`为`.`，即当前目录。
>
> 3. 在IDE中运行Java程序，IDE自动传入的`-cp`参数是当前工程的`bin`目录和引入的jar包。
>
> 4. **不要把任何Java核心库添加到classpath中！JVM根本不依赖classpath加载核心库！**
>
> 5. 然后，把后缀从`.zip`改为`.jar`，一个jar包就创建成功。
>
> 6. jar包还可以包含一个特殊的`/META-INF/MANIFEST.MF`文件，`MANIFEST.MF`是纯文本，可以指定`Main-Class`和其它信息。JVM会自动读取这个`MANIFEST.MF`文件，如果存在`Main-Class`，我们就不必在命令行指定启动的类名，而是用更方便的命令：`java -jar hello.jar`

### 模块

1. JVM自带的Java标准库，实际上也是以jar文件形式存放的，这个文件叫`rt.jar`，一共有60多M。
2. 详情见：[模块 - 廖雪峰的官方网站 (liaoxuefeng.com)](https://www.liaoxuefeng.com/wiki/1252599548343744/1281795926523938)

## Java核心类

### 字符串和编码

1. 实际上字符串在`String`内部是通过一个`char[]`数组表示的，因此，按下面的写法也是可以的：

```java
String s2 = new String(new char[] {'H', 'e', 'l', 'l', 'o', '!'});
```

2. 字符串*不可变*。这种不可变性是通过内部的`private final char[]`字段

3. 实际上那只是Java编译器在编译期，会自动把所有相同的字符串当作一个对象放入常量池，自然`s1`和`s2`的引用就是相同的。

4. `CharSequence`是`String`的父类。

5. 另一个`strip()`方法也可以移除字符串首尾空白字符。它和`trim()`不同的是，类似中文的空格字符`\u3000`也会被移除

`String`还提供了`isEmpty()`和`isBlank()`来判断字符串是否为空和空白字符串

```java
String s = "Hi %s, your score is %d!";
System.out.println(s.formatted("Alice", 80));
System.out.println(String.format("Hi %s, your score is %.2f!", "Bob", 59.5));
```
6. 特别注意，`Integer`有个`getInteger(String)`方法，它不是将字符串转换为`int`，而是把该字符串对应的系统变量转换为`Integer`：`Integer.getInteger("java.version"); // 版本号，11`

7. `String`和`char[]`类型可以互相转换，方法是：

   ```java
   char[] cs = "Hello".toCharArray(); // String -> char[]
   String s = new String(cs); // char[] -> String
   // 如果修改了char[]数组，String并不会改变
   // 这是因为通过new String(char[])创建新的String实例时，它并不会直接引用传入的char[]数组，而是会复制一份，所以，修改外部的char[]数组不会影响String实例内部的char[]数组，因为这是两个不同的数组。
   ```

8. `UTF-8`编码，它是一种变长编码，用来把固定长度的`Unicode`编码变成1～4字节的变长编码。通过`UTF-8`编码，英文字符`'A'`的`UTF-8`编码变为`0x41`，正好和`ASCII`码一致，而中文`'中'`的`UTF-8`编码为3字节`0xe4b8ad`。

9. ```java
   
   byte[] b1 = "Hello".getBytes(); // 按系统默认编码转换，不推荐
   byte[] b2 = "Hello".getBytes("UTF-8"); // 按UTF-8编码转换
   byte[] b2 = "Hello".getBytes("GBK"); // 按GBK编码转换
   byte[] b3 = "Hello".getBytes(StandardCharsets.UTF_8); // 按UTF-8编码转换
   
   byte[] b = ...
   String s1 = new String(b, "GBK"); // 按GBK转换
   String s2 = new String(b, StandardCharsets.UTF_8); // 按UTF-8转换
   // Java的String和char在内存中总是以Unicode编码表示。
   ```

### StringBuilder

> 小知识：
>
> 1. 虽然可以直接拼接字符串，但是，在循环中，每次循环都会创建新的字符串对象，然后扔掉旧的字符串。这样，绝大部分字符串都是临时对象，不但浪费内存，还会影响GC效率。
>
>    为了能高效拼接字符串，Java标准库提供了`StringBuilder`，它是一个可变对象，可以预分配缓冲区，这样，往`StringBuilder`中新增字符时，不会创建新的临时对象，`StringBuilder`还可以进行链式操作。
>
> 2. `StringBuffer`是`StringBuilder`的线程安全版本，但是同步会带来执行速度的下降。现在很少使用。

### StringJoiner

> 小知识：
>
> 1. 要高效拼接字符串，应该使用`StringBuilder`。
>
> 2. 类似用分隔符拼接数组的需求很常见，所以Java标准库还提供了一个`StringJoiner`来干这个事。
>
> 3. `var sj = new StringJoiner(", ", "Hello ", "!");`，参数分别是 分隔符，开头，结尾
>
> 4. `String`还提供了一个静态方法`join()`，这个方法在内部使用了`StringJoiner`来拼接字符串，在不需要指定“开头”和“结尾”的时候，用`String.join("-",arr)`更方便。

### 包装类型

```java
    // 通过new操作符创建Integer实例(不推荐使用,会有编译警告):
    Integer n1 = new Integer(i);
    // 通过静态方法valueOf(int)创建Integer实例:
    Integer n2 = Integer.valueOf(i);
    // 通过静态方法valueOf(String)创建Integer实例:
    Integer n3 = Integer.valueOf("100");

int x2 = Integer.parseInt("100", 16); // 256,因为按16进制解析
System.out.println(Integer.toHexString(100)); // "64",表示为16进制
```
> 1. 自动装箱和自动拆箱只发生在编译阶段，目的是为了少写代码。
>
>    装箱和拆箱会影响代码的执行效率，因为编译后的`class`代码是严格区分基本类型和引用类型的。
>
> 2. 所有的包装类型都是不变类。 `private final int value;`
>
> 3. 所有的整数和浮点数的包装类型都继承自`Number`
>
> 4. 在Java中，并没有无符号整型（Unsigned）的基本数据类型。转换成无符号`Byte.toUnsignedInt(-1)`=255，（无符号 0-255）

### 枚举类

```java
enum Weekday {
    SUN, MON, TUE, WED, THU, FRI, SAT;
}
```

> 小知识：
>
> 1. 在Java中，我们可以通过`static final`来定义常量。可以用enum替代，
>
>    Java使用`enum`定义枚举类型，它被编译器编译为`final class Xxx extends Enum { … }`；
>
> 2. `enum`常量本身带有类型信息，即`Weekday.SUN`类型是`Weekday`，编译器会自动检查出类型错误。
>
> 3. `enum`定义的类型就是`class`，每个枚举的值都是`class`实例。
>
>    - 定义的`enum`类型总是继承自`java.lang.Enum`，且无法被继承；
>    - 只能定义出`enum`的实例，而无法通过`new`操作符创建`enum`的实例；
>    - 定义的每个实例都是引用类型的唯一实例；
>    - 可以将`enum`类型用于`switch`语句。
>
> 4. ```java
>    String s = Weekday.SUN.name(); // "SUN" 返回常量名
>    int n = Weekday.MON.ordinal(); // 1 返回定义的常量的顺序
>    ```
>
> 5. 因为`enum`本身是`class`，所以我们可以定义`private`的构造方法，并且，给每个枚举常量添加字段。然后通过构造方法在类中实例枚举对象
>
>    ```java
>    enum Weekday {
>        MON(1, "星期一"), TUE(2, "星期二"), WED(3, "星期三"), THU(4, "星期四"), FRI(5, "星期五"), SAT(6, "星期六"), SUN(0, "星期日");
>    
>        public final int dayValue; // 枚举类的字段也可以是非final类型，即可以在运行期修改，但是不推荐这样做！
>        private final String chinese;
>    
>        private Weekday(int dayValue, String chinese) {
>            this.dayValue = dayValue;
>            this.chinese = chinese;
>        }
>    
>        @Override
>        public String toString() {
>            return this.chinese;
>        }
>    }
>    ```

### 纪录类

使用`String`、`Integer`等类型的时候，这些类型都是不变类，一个不变类具有以下特点：

1. 定义class时使用`final`，无法派生子类；
2. 每个字段使用`final`，保证创建实例后无法修改任何字段。

使用`record`关键字，可以一行写出一个不变类。

从Java 14开始，提供新的`record`关键字，可以非常方便地定义Data Class：

- 使用`record`定义的是不变类；
- 可以编写Compact Constructor（全参构造器？？）对参数进行验证；
- 可以定义静态方法。

### BigInteger

小结

1. `BigInteger`用于表示任意大小的整数；
2. `BigInteger`是不变类，并且继承自`Number`；
3. 将`BigInteger`转换成基本类型时可使用`longValueExact()`等方法保证结果准确。

### BigDecimal

1. 如果查看`BigDecimal`的源码，可以发现，实际上一个`BigDecimal`是通过一个`BigInteger`和一个`scale`来表示的，即`BigInteger`表示一个完整的整数，而`scale`表示小数位数。

2. `BigDecimal`用于表示精确的小数，常用于财务计算；

3. 比较`BigDecimal`的值是否相等，必须使用`compareTo()`而不能使用`equals()`。

## 异常处理

### Java的异常

```ascii
                     ┌───────────┐
                     │  Object   │
                     └───────────┘
                           ▲
                           │
                     ┌───────────┐
                     │ Throwable │
                     └───────────┘
                           ▲
                 ┌─────────┴─────────┐
                 │                   │
           ┌───────────┐       ┌───────────┐
           │   Error   │       │ Exception │
           └───────────┘       └───────────┘
                 ▲                   ▲
         ┌───────┘              ┌────┴──────────┐
         │                      │               │
┌─────────────────┐    ┌─────────────────┐┌───────────┐
│OutOfMemoryError │... │RuntimeException ││IOException│...
└─────────────────┘    └─────────────────┘└───────────┘
                                ▲
                    ┌───────────┴─────────────┐
                    │                         │
         ┌─────────────────────┐ ┌─────────────────────────┐
         │NullPointerException │ │IllegalArgumentException │...
         └─────────────────────┘ └─────────────────────────┘
```

编译器对RuntimeException及其子类不做强制捕获要求，不是指应用程序本身不应该捕获并处理RuntimeException。是否需要捕获，具体问题具体分析。

- `Error`是无需捕获的严重错误，`Exception`是应该捕获的可处理的错误；
- `RuntimeException`无需强制捕获，非`RuntimeException`（Checked Exception）需强制捕获，或者用`throws`声明；
- 不推荐捕获了异常但不进行任何处理。

某些情况下，可以没有`catch`，只使用`try ... finally`结构。因为方法声明了可能抛出的异常，所以可以不写`catch`。

在`catch`中抛出异常，不会影响`finally`的执行。JVM会先执行`finally`，然后抛出异常。

### 抛出异常

这说明`finally`抛出异常后，原来在`catch`中准备抛出的异常就“消失”了，因为只能抛出一个异常。没有被抛出的异常称为“被屏蔽”的异常（Suppressed Exception）。

### 自定义异常

在一个大型项目中，可以自定义新的异常类型，但是，保持一个合理的异常继承体系是非常重要的。

一个常见的做法是自定义一个`BaseException`作为“根异常”，然后，派生出各种业务类型的异常。

`BaseException`需要从一个适合的`Exception`派生，通常建议从`RuntimeException`派生。自定义的`BaseException`应该提供多个构造方法。

```java
public class BaseException extends RuntimeException {
}
```

### 断言

> 小知识：
>
> 1. 断言是一种调试方式，断言失败会抛出`AssertionError`，只能在开发和测试阶段启用断言；
> 2. `assert x >= 0 : "x must >= 0";`断言失败的时候，`AssertionError`会带上消息`x must >= 0`，更加便于调试。
> 3. 对可恢复的错误不能使用断言，而应该抛出异常；
> 4. 断言很少被使用，更好的方法是编写单元测试。JUnit

### 使用JDK Logging

JDK的Logging定义了七个级别从严重到普通：SEVERE，WARNING，INFO，CONFIG，FINE，FINER，FINEST，默认级别是INFO

Logging系统在JVM启动时读取配置文件并完成初始化，一旦开始运行`main()`方法，就无法修改配置；

配置不太方便，需要在JVM启动时传递参数`-Djava.util.logging.config.file=<config-file-name>`。

因此，Java标准库内置的Logging使用并不是非常广泛。

> 小总结：
>
> 1. 日志是为了替代`System.out.println()`，可以定义格式，重定向到文件等；
> 2. 日志可以存档，便于追踪问题；
> 3. 日志记录可以按级别分类，便于打开或关闭某些级别；
> 4. 可以根据配置文件调整日志，无需修改代码；
> 5. Java标准库提供了`java.util.logging`来实现日志功能。

### 使用Commons Logging

1. Commons Logging是一个第三方日志库，它是由Apache创建的日志模块。

2. Commons Logging的特色是，它可以挂接不同的日志系统，并通过配置文件指定挂接的日志系统。默认情况下，Commons Loggin自动搜索并使用Log4j（Log4j是另一个流行的日志系统），==如果没有找到Log4j，再使用JDK Logging。==

3. 使用Commons Logging只需要和两个类打交道，并且只有两步：

   - 第一步，通过`LogFactory`获取`Log`类的实例； 

   - 第二步，使用`Log`实例的方法打日志。

   - ```java
     Log log = LogFactory.getLog(getClass());
     log.info("start...");
     log.warn("end.");
     
     // 使用log.error(String, Throwable)打印异常。
     log.error("got exception!", e);
     ```

Commons Logging定义了6个日志级别：

- FATAL
- ERROR
- WARNING
- INFO
- DEBUG
- TRACE

默认级别是`INFO`。

### 使用Log4j

Commons Logging，可以作为“日志接口”来使用。而真正的“日志实现”可以使用Log4j。

以XML配置为例，使用Log4j的时候，我们把一个`log4j2.xml`的文件放到`classpath`下就可以让Log4j读取配置文件并按照我们的配置来输出日志。

`log4j2.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Configuration>
	<Properties>
        <!-- 定义日志格式 -->
		<Property name="log.pattern">%d{MM-dd HH:mm:ss.SSS} [%t] %-5level %logger{36}%n%msg%n%n</Property>
        <!-- 定义文件名变量 -->
		<Property name="file.err.filename">log/err.log</Property>
		<Property name="file.err.pattern">log/err.%i.log.gz</Property>
	</Properties>
    <!-- 定义Appender，即目的地 -->
	<Appenders>
        <!-- 定义输出到屏幕 -->
		<Console name="console" target="SYSTEM_OUT">
            <!-- 日志格式引用上面定义的log.pattern -->
			<PatternLayout pattern="${log.pattern}" />
		</Console>
        <!-- 定义输出到文件,文件名引用上面定义的file.err.filename -->
		<RollingFile name="err" bufferedIO="true" fileName="${file.err.filename}" filePattern="${file.err.pattern}">
			<PatternLayout pattern="${log.pattern}" />
			<Policies>
                <!-- 根据文件大小自动切割日志 -->
				<SizeBasedTriggeringPolicy size="1 MB" />
			</Policies>
            <!-- 保留最近10份 -->
			<DefaultRolloverStrategy max="10" />
		</RollingFile>
	</Appenders>
	<Loggers>
		<Root level="info">
            <!-- 对info级别的日志，输出到console -->
			<AppenderRef ref="console" level="info" />
            <!-- 对error级别的日志，输出到err，即上面定义的RollingFile -->
			<AppenderRef ref="err" level="error" />
		</Root>
	</Loggers>
</Configuration>
```

### 使用SLF4J和Logback

Commons Logging和Log4j这一对好基友，它们一个负责充当日志API，一个负责实现日志底层，搭配使用非常便于开发。

SLF4J类似于Commons Logging，也是一个日志接口，而Logback类似于Log4j，是一个日志的实现。

`logback.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>

	<appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
		<encoder>
			<pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
		</encoder>
	</appender>

	<appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
		<encoder>
			<pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
			<charset>utf-8</charset>
		</encoder>
		<file>log/output.log</file>
		<rollingPolicy class="ch.qos.logback.core.rolling.FixedWindowRollingPolicy">
			<fileNamePattern>log/output.log.%i</fileNamePattern>
		</rollingPolicy>
		<triggeringPolicy class="ch.qos.logback.core.rolling.SizeBasedTriggeringPolicy">
			<MaxFileSize>1MB</MaxFileSize>
		</triggeringPolicy>
	</appender>

	<root level="INFO">
		<appender-ref ref="CONSOLE" />
		<appender-ref ref="FILE" />
	</root>
</configuration>
```

SLF4J和Logback可以取代Commons Logging和Log4j；

始终使用SLF4J的接口写入日志，使用Logback只需要配置，不需要修改代码。

## 反射

反射就是Reflection，Java的反射是指程序在运行期可以拿到一个对象的所有信息。

所以，反射是为了解决在运行期，对某个实例一无所知的情况下，如何调用其方法。

- 网上有个很有意思的解释,java是个大美女,但大美女有很多事情是规定不让你做的.反射就是把枪,有枪在手,你想让大美女做什么事就做什么事,脱光了都没问题.希望这段解释能帮助到看到的人

 《Spring 中的反射与反射的原理》https://depp.wang/2020/05/05/reflection-in-spring-and-reflection-principle/

### Class类

一个`Class`实例包含了该`class`的所有完整信息：

```ascii
┌───────────────────────────┐
│      Class Instance       │──────> String
├───────────────────────────┤
│name = "java.lang.String"  │
├───────────────────────────┤
│package = "java.lang"      │
├───────────────────────────┤
│super = "java.lang.Object" │
├───────────────────────────┤
│interface = CharSequence...│
├───────────────────────────┤
│field = value[],hash,...   │
├───────────────────────────┤
│method = indexOf()...      │
└───────────────────────────┘
```

1. 由于JVM为每个加载的`class`创建了对应的`Class`实例，并在实例中保存了该`class`的所有信息，包括类名、包名、父类、实现的接口、所有方法、字段等，因此，如果获取了某个`Class`实例，我们就可以通过这个`Class`实例获取到该实例对应的`class`的所有信息。

   这种通过`Class`实例获取`class`信息的方法称为反射（Reflection）。

2. 如何获取一个`class`的`Class`实例？有三个方法：

    ```java
    // 方法一：直接通过一个class的静态变量class获取：
    Class cls = String.class;

    // 方法二：如果我们有一个实例变量，可以通过该实例变量提供的getClass()方法获取：
    String s = "Hello";
    Class cls = s.getClass();

    // 方法三：如果知道一个class的完整类名，可以通过静态方法Class.forName()获取：
    Class cls = Class.forName("java.lang.String");
    ```
    
    因为`Class`实例在JVM中是唯一的，所以，上述方法获取的`Class`实例是同一个实例。

3. 通过`Class.newInstance()`可以创建类实例，它的局限是：只能调用`public`的无参数构造方法。带参数的构造方法，或者非`public`的构造方法都无法通过`Class.newInstance()`被调用。
4. 动态加载`class`的特性对于Java程序非常重要。利用JVM动态加载`class`的特性，我们才能在运行期根据条件加载不同的实现类。

> 小结
>
> 1. JVM为每个加载的`class`及`interface`创建了对应的`Class`实例来保存`class`及`interface`的所有信息；
> 2. 获取一个`class`对应的`Class`实例后，就可以获取该`class`的所有信息；
> 3. 通过Class实例获取`class`信息的方法称为反射（Reflection）；
> 4. JVM总是动态加载`class`，可以在运行期根据条件来控制加载class。

### 访问字段

`Class`类提供了以下几个方法来获取字段：

- Field getField(name)：根据字段名获取某个public的field（包括父类）
- Field getDeclaredField(name)：根据字段名获取当前类的某个field（不包括父类）
- Field[] getFields()：获取所有public的field（包括父类）
- Field[] getDeclaredFields()：获取当前类的所有field（不包括父类）

一个`Field`对象包含了一个字段的所有信息：

- `getName()`：返回字段名称，例如，`"name"`；
- `getType()`：返回字段类型，也是一个`Class`实例，例如，`String.class`；
- `getModifiers()`：返回字段的修饰符，它是一个`int`，不同的bit表示不同的含义。

> 1. 先获取`Class`实例，再获取`Field`实例，然后，用`Field.get(Object)`获取指定实例的指定字段的值。
> 2. 调用`Field.setAccessible(true)`的意思是，别管这个字段是不是`public`，一律允许访问。
> 3. 而反射是一种非常规的用法，使用反射，首先代码非常繁琐，其次，它更多地是给工具或者底层框架来使用，目的是在不知道目标实例任何信息的情况下，获取特定字段的值。
> 4. 设置字段值是通过`Field.set(Object, Object)`实现的，其中第一个`Object`参数是指定的实例，第二个`Object`参数是待修改的值。
>
> 此外，`setAccessible(true)`可能会失败。如果JVM运行期存在`SecurityManager`，那么它会根据规则进行检查，有可能阻止`setAccessible(true)`。例如，某个`SecurityManager`可能不允许对`java`和`javax`开头的`package`的类调用`setAccessible(true)`，这样可以保证JVM核心库的安全。

### 调用方法

通过`Class`实例获取所有`Method`信息：

- `Method getMethod(name, Class...)`：获取某个`public`的`Method`（包括父类）
- `Method getDeclaredMethod(name, Class...)`：获取当前类的某个`Method`（不包括父类）
- `Method[] getMethods()`：获取所有`public`的`Method`（包括父类）
- `Method[] getDeclaredMethods()`：获取当前类的所有`Method`（不包括父类）

一个`Method`对象包含一个方法的所有信息：

- `getName()`：返回方法名称，例如：`"getScore"`；
- `getReturnType()`：返回方法返回值类型，也是一个Class实例，例如：`String.class`；
- `getParameterTypes()`：返回方法的参数类型，是一个Class数组，例如：`{String.class, int.class}`；
- `getModifiers()`：返回方法的修饰符，它是一个`int`，不同的bit表示不同的含义。

> 1. 通过`Method`实例可以调用某个对象的方法：`Object invoke(Object instance, Object... parameters)`；
> 2. 调用静态方法时，由于无需指定实例对象，所以`invoke`方法传入的第一个参数永远为`null`。
> 3. 通过设置`setAccessible(true)`来访问非`public`方法；
> 4. 通过反射调用方法时，仍然遵循多态原则。：即总是调用实际类型的覆写方法（如果存在）。

### 调用构造方法

```java
// 方式一
Person p = Person.class.newInstance();

// 方式二，获取构造方法Integer(int):
Constructor cons1 = Integer.class.getConstructor(int.class);
// 调用构造方法:
Integer n1 = (Integer) cons1.newInstance(123);
```

通过Class实例获取Constructor的方法如下：

- `getConstructor(Class...)`：获取某个`public`的`Constructor`；
- `getDeclaredConstructor(Class...)`：获取某个`Constructor`；
- `getConstructors()`：获取所有`public`的`Constructor`；
- `getDeclaredConstructors()`：获取所有`Constructor`。

### 获取继承关系

> 小结
>
> 1. 通过`Class`对象可以获取继承关系：
>    - `Class getSuperclass()`：获取父类类型；
>    - `Class[] getInterfaces()`：获取当前类实现的所有接口。
>
> 2. 通过`Class`对象的`isAssignableFrom()`方法可以判断一个向上转型是否可以实现。

### 动态代理

```java
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

public class Main {
    public static void main(String[] args) {
        InvocationHandler handler = new InvocationHandler() {
            @Override
            public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                System.out.println(method);
                // 根据方法名字判断是哪一个方法，也就是所有方法调用都会走到这里
                if (method.getName().equals("morning")) {
                    System.out.println("Good morning, " + args[0]);
                }
                return null;
            }
        };
        Hello hello = (Hello) Proxy.newProxyInstance( // 动态代理
            Hello.class.getClassLoader(), // 传入ClassLoader
            new Class[] { Hello.class }, // 传入要实现的接口
            handler); // 传入处理调用方法的InvocationHandler
        hello.morning("Bob");
    }
}

interface Hello {
    void morning(String name);
}

```

在运行期动态创建一个`interface`实例的方法如下：

1. 定义一个`InvocationHandler`实例，它负责实现接口的方法调用；
2. 通过`Proxy.newProxyInstance()`创建`interface`实例，它需要3个参数：
   1. 使用的`ClassLoader`，通常就是接口类的`ClassLoader`；
   2. 需要实现的接口数组，至少需要传入一个接口进去；
   3. 用来处理接口方法调用的`InvocationHandler`实例。
3. 将返回的`Object`强制转型为接口。

动态代理实际上是JVM在运行期动态创建class字节码并加载的过程，

## 注解

### 使用注解

什么是注解（Annotation）？注解是放在Java源码的类、方法、字段、参数前的一种特殊“注释”。

注释会被编译器直接忽略，注解则可以被编译器打包进入class文件，因此，注解是一种用作标注的“元数据”。

小结

1. 注解（Annotation）是Java语言用于工具处理的标注：
2. 注解可以配置参数，没有指定配置的参数使用默认值；
3. 如果参数名称是`value`，且只有一个参数，那么可以省略参数名称。

### 定义注解

Java语言使用`@interface`语法来定义注解（`Annotation`），注解的参数类似无参数方法，可以用`default`设定一个默认值（强烈推荐）。最常用的参数应当命名为`value`。

有一些注解可以修饰其他注解，这些注解就称为元注解（meta annotation）。Java标准库已经定义了一些元注解，我们只需要使用元注解，通常不需要自己去编写元注解。

#### @Target

最常用的元注解是`@Target`。使用`@Target`可以定义`Annotation`能够被应用于源码的哪些位置：

- 类或接口：`ElementType.TYPE`；
- 字段：`ElementType.FIELD`；
- 方法：`ElementType.METHOD`；
- 构造方法：`ElementType.CONSTRUCTOR`；
- 方法参数：`ElementType.PARAMETER`。

#### @Retention

另一个重要的元注解`@Retention`定义了`Annotation`的生命周期：

- 仅编译期：`RetentionPolicy.SOURCE`；
- 仅class文件：`RetentionPolicy.CLASS`；
- 运行期：`RetentionPolicy.RUNTIME`。

如果`@Retention`不存在，则该`Annotation`默认为`CLASS`。因为通常我们自定义的`Annotation`都是`RUNTIME`，所以，务必要加上`@Retention(RetentionPolicy.RUNTIME)`这个元注解

#### @Repeatable

使用`@Repeatable`这个元注解可以定义`Annotation`是否可重复。这个注解应用不是特别广泛。

#### @Inherited

使用`@Inherited`定义子类是否可继承父类定义的`Annotation`。`@Inherited`仅针对`@Target(ElementType.TYPE)`类型的`annotation`有效，并且仅针对`class`的继承，对`interface`的继承无效：

### 处理注解

Java的注解本身对代码逻辑没有任何影响。根据`@Retention`的配置：

- `SOURCE`类型的注解在编译期就被丢掉了；
- `CLASS`类型的注解仅保存在class文件中，它们不会被加载进JVM；
- `RUNTIME`类型的注解会被加载进JVM，并且在运行期可以被程序读取。

如何使用注解完全由工具决定。`SOURCE`类型的注解主要由编译器使用，因此我们一般只使用，不编写。`CLASS`类型的注解主要由底层工具库使用，涉及到class的加载，一般我们很少用到。只有`RUNTIME`类型的注解不但要使用，还经常需要编写。

使用反射API读取Annotation：

- `Class.getAnnotation(Class)`
- `Field.getAnnotation(Class)`
- `Method.getAnnotation(Class)`
- `Constructor.getAnnotation(Class)`

```java
void check(Person person) throws IllegalArgumentException, ReflectiveOperationException {
    // 遍历所有Field:
    for (Field field : person.getClass().getFields()) {
        // 获取Field定义的@Range:
        Range range = field.getAnnotation(Range.class);
        // 如果@Range存在:
        if (range != null) {
            // 获取Field的值:
            Object value = field.get(person);
            // 如果值是String:
            if (value instanceof String) {
                String s = (String) value;
                // 判断值是否满足@Range的min/max:
                if (s.length() < range.min() || s.length() > range.max()) {
                    throw new IllegalArgumentException("Invalid field: " + field.getName());
                }
            }
        }
    }
}
```

## 泛型（）

万能类型

### 什么是泛型

因此，泛型就是定义一种模板，例如`ArrayList<T>`，然后在代码中为用到的类创建对应的`ArrayList<类型>`，由编译器针对类型作检查。

小结

1. 泛型就是编写模板代码来适应任意类型；
2. 泛型的好处是使用时不必对类型进行强制转换，它通过编译器对类型进行检查；
3. 注意泛型的继承关系：可以把`ArrayList<Integer>`向上转型为`List<Integer>`（`T`不能变！），但不能把`ArrayList<Integer>`向上转型为`ArrayList<Number>`（`T`不能变成父类）。

### 编写泛型

对于静态方法，我们可以单独改写为“泛型”方法，只需要使用另一个类型即可。

```java
// 静态泛型方法应该使用其他类型区分:
public static <K> Pair<K> create(K first, K last) {
	return new Pair<K>(first, last);
}
```

静态方法不能引用泛型类型`<T>`，必须定义其他类型（例如`<K>`）来实现静态泛型方法；

泛型可以同时定义多种类型，例如`Map<K, V>`。

### 擦拭法

所谓擦拭法是指，虚拟机对泛型其实一无所知，所有的工作都是编译器做的。

因此，Java使用擦拭法实现泛型，导致了：

- 编译器把类型`<T>`视为`Object`；
- 编译器根据`<T>`实现安全的强制转型。

局限一：`<T>`不能是基本类型，例如`int`，因为实际类型是`Object`，`Object`类型无法持有基本类型：

局限二：无法取得带泛型的`Class`。例如：`Pair<String>.class`；

局限三：无法判断带泛型的类型，例如：`x instanceof Pair<String>`；

局限四：不能实例化`T`类型，例如：`new T()`。要想实例化`T`类型，我们必须借助额外的`Class<T>`参数

泛型方法要防止重复定义方法，例如：`public boolean equals(T obj)`；

子类可以获取父类的泛型类型`<T>`。例如，`class IntPair extends Pair<Integer>`子类是Integer类型

### extends通配符（）

我们前面已经讲到了泛型的继承关系：`Pair<Integer>`不是`Pair<Number>`的子类。`<Number>`只接受Number类型的参数不接受子类型Integer

这种使用`<? extends Number>`的泛型定义称之为上界通配符（Upper Bounds Wildcards），即把泛型类型`T`的上界限定在`Number`了。

`<? extends Number>`通配符的一个重要限制：方法参数签名`setFirst(? extends Number)`无法传递任何`Number`的子类型给`setFirst(? extends Number)`。

> 小总结：
>
> 使用类似`<? extends Number>`通配符作为方法参数时表示：
>
> - 方法内部可以调用获取`Number`引用的方法，例如：`Number n = obj.getFirst();`；
> - 方法内部无法调用传入`Number`引用的方法（`null`除外），例如：`obj.setFirst(Number n);`。
>
> 即一句话总结：使用`extends`通配符表示可以读，不能写。
>
> 使用类似`<T extends Number>`定义泛型类时表示：
>
> - 泛型类型限定为`Number`以及`Number`的子类。

### uper通配符（）

我们再回顾一下`extends`通配符。作为方法参数，`<? extends T>`类型和`<? super T>`类型的区别在于：

- `<? extends T>`允许调用读方法`T get()`获取`T`的引用，但不允许调用写方法`set(T)`传入`T`的引用（传入`null`除外）；
- `<? super T>`允许调用写方法`set(T)`传入`T`的引用，但不允许调用读方法`T get()`获取`T`的引用（获取`Object`除外）。

一个是允许读不允许写，另一个是允许写不允许读。

### 泛型和反射（）

部分反射API是泛型，例如：`Class<T>`，`Constructor<T>`；

可以声明带泛型的数组，但不能直接创建带泛型的数组，必须强制转型；

可以通过`Array.newInstance(Class<T>, int)`创建`T[]`数组，需要强制转型；

同时使用泛型和可变参数时需要特别小心。

## 集合（）

### Java集合简介

什么是集合（Collection）？集合就是“由若干个确定的元素所构成的整体”。

在Java中，如果一个Java对象可以在内部持有若干其他Java对象，并对外提供访问接口，我们把这种Java对象称为集合。很显然，Java的数组可以看作是一种集合

不同集合的数据结构及特性不同，所有我们需要除数组外的其他集合。

Java的集合类定义在`java.util`包中，支持泛型，主要提供了3种集合类，包括`List`，`Set`和`Map`。Java集合使用统一的`Iterator`遍历，尽量不要使用遗留接口。

### 使用List

`ArrayList`把添加和删除的操作封装起来，让我们操作`List`类似于操作数组，却不用关心内部元素如何移动。本质是数组。

- 在末尾添加一个元素：`boolean add(E e)`
- 在指定索引添加一个元素：`boolean add(int index, E e)`
- 删除指定索引的元素：`E remove(int index)`
- 删除某个元素：`boolean remove(Object e)`
- 获取指定索引的元素：`E get(int index)`
- 获取链表大小（包含元素的个数）：`int size()

`LinkedList`通过“链表”也实现了List接口。在`LinkedList`中，它的内部每个元素都指向下一个元素，通常情况下，我们总是优先使用`ArrayList`。

除了使用`ArrayList`和`LinkedList`，我们还可以通过`List`接口提供的`of()`方法，根据给定元素快速创建`List`：

```java
List<Integer> list = List.of(1, 2, 5);
// 但是List.of()方法不接受null值，如果传入null，会抛出NullPointerException异常。
```

实际上，只要实现了`Iterable`接口的集合类都可以直接用`for each`循环来遍历，Java编译器本身并不知道如何遍历集合对象，但它会自动把`for each`循环变成`Iterator`的调用，原因就在于`Iterable`接口定义了一个`Iterator<E> iterator()`方法，强迫集合类必须返回一个`Iterator`实例。

把`List`变为`Array`有三种方法，

1. 第一种是调用`toArray()`方法直接返回一个`Object[]`数组：`Object[] array = list.toArray();`

2. 第二种方式是给`toArray(T[])`传入一个类型相同的`Array`，`List`内部自动把元素复制到传入的`Array`中：`Integer[] array = list.toArray(new Integer[3]);`

   如果传入的数组不够大，那么`List`内部会创建一个新的刚好够大的数组，填充后返回；如果传入的数组比`List`元素还要多，那么填充完元素后，剩下的数组元素一律填充`null`。

3. 最后一种更简洁的写法是通过`List`接口定义的`T[] toArray(IntFunction<T[]> generator)`方法：`Integer[] array = list.toArray(Integer[]::new);`函数式编程

反过来，把`Array`变为`List`就简单多了，通过`List.of(T...)`方法最简单：

对于JDK 11之前的版本，可以使用`Arrays.asList(T...)`方法把数组转换成`List`。

要注意的是，返回的`List`不一定就是`ArrayList`或者`LinkedList`，因为`List`只是一个接口，如果我们调用`List.of()`，它返回的是一个只读`List`：

### 编写equals方法

如何正确编写`equals()`方法？`equals()`方法要求我们必须满足以下条件：

- 自反性（Reflexive）：对于非`null`的`x`来说，`x.equals(x)`必须返回`true`；
- 对称性（Symmetric）：对于非`null`的`x`和`y`来说，如果`x.equals(y)`为`true`，则`y.equals(x)`也必须为`true`；
- 传递性（Transitive）：对于非`null`的`x`、`y`和`z`来说，如果`x.equals(y)`为`true`，`y.equals(z)`也为`true`，那么`x.equals(z)`也必须为`true`；
- 一致性（Consistent）：对于非`null`的`x`和`y`来说，只要`x`和`y`状态不变，则`x.equals(y)`总是一致地返回`true`或者`false`；
- 对`null`的比较：即`x.equals(null)`永远返回`false`。

因此，我们总结一下`equals()`方法的正确编写方法：

1. 先确定实例“相等”的逻辑，即哪些字段相等，就认为实例相等；
2. 用`instanceof`判断传入的待比较的`Object`是不是当前类型，如果是，继续比较，否则，返回`false`；
3. 对引用类型用`Objects.equals()`比较，对基本类型直接用`==`比较。

使用`Objects.equals()`比较两个引用类型是否相等的目的是省去了判断`null`的麻烦。两个引用类型都是`null`时它们也是相等的。

如果不调用`List`的`contains()`、`indexOf()`这些方法，那么放入的元素就不需要实现`equals()`方法。

### 使用Map

> 小知识：
>
> 1. `Map<K, V>`是一种键-值映射表，当我们调用`put(K key, V value)`方法时，就把`key`和`value`做了映射并放入`Map`。当我们调用`V get(K key)`时，就可以通过`key`获取到对应的`value`。如果`key`不存在，则返回`null`。和`List`类似，`Map`也是一个接口，最常用的实现类是`HashMap`。
> 2. 实际上，`put()`方法的签名是`V put(K key, V value)`，如果放入的`key`已经存在，`put()`方法会返回被删除的旧的`value`，否则，返回`null`。
> 3. `Map`和`List`不同的是，`Map`存储的是`key-value`的映射关系，并且，它*不保证顺序*。在遍历的时候，遍历的顺序既不一定是`put()`时放入的`key`的顺序，也不一定是`key`的排序顺序。

### 编写equals和hashCode

`HashMap`之所以能根据`key`直接拿到`value`，原因是它内部通过空间换时间的方法，用一个大数组存储所有`value`，并根据key直接计算出`value`应该存储在哪个索引

两个`key`内容相同，但不一定是同一个对象。

通过`key`计算索引的方式就是调用`key`对象的`hashCode()`方法，它返回一个`int`整数。`HashMap`正是通过这个方法直接定位`key`对应的`value`的索引，继而直接返回`value`。

因此，正确使用`Map`必须保证：

1. 作为`key`的对象必须正确覆写`equals()`方法，相等的两个`key`实例调用`equals()`必须返回`true`；
2. 作为`key`的对象还必须正确覆写`hashCode()`方法，且`hashCode()`方法要严格遵循以下规范：
   - 如果两个对象相等，则两个对象的`hashCode()`必须相等；
   - 如果两个对象不相等，则两个对象的`hashCode()`尽量不要相等。哈希冲突，导致效率降低。

### 使用EnumMap

如果`Map`的key是`enum`类型，推荐使用`EnumMap`，既保证速度，也不浪费空间。

使用`EnumMap`的时候，根据面向抽象编程的原则，应持有`Map`接口。

### 使用TreeMap

还有一种`Map`，它在内部会对Key进行排序，这种`Map`就是`SortedMap`。注意到`SortedMap`是接口，它的实现类是`TreeMap`。

使用`TreeMap`时，放入的Key必须实现`Comparable`接口。`String`、`Integer`这些类已经实现了`Comparable`接口，因此可以直接作为Key使用。

`TreeMap`在比较两个Key是否相等时，依赖Key的`compareTo()`方法或者`Comparator.compare()`方法。在两个Key相等时，必须返回`0`。或者直接借助`Integer.compare(int, int)`也可以返回正确的比较结果。

### 使用Properties

配置文件的特点是，它的Key-Value一般都是`String`-`String`类型的，因此我们完全可以用`Map<String, String>`来表示它。

因为配置文件非常常用，所以Java集合库提供了一个`Properties`来表示一组“配置”。由于历史遗留原因，`Properties`内部本质上是一个`Hashtable`，但我们只需要用到`Properties`自身关于读写配置的接口。

> 用`Properties`读取配置文件，一共有三步：
>
> 1. 创建`Properties`实例；`Properties props = new Properties();`
> 2. 调用`load()`读取文件；
>    - props.load(getClass().getResourceAsStream("/common/setting.properties"));
>    - `props.load(new FileInputStream("C:\\conf\\setting.properties"));`
> 3. 调用`getProperty()`获取配置。`String interval = props.getProperty("auto_save_interval", "120");`
>
> 调用`getProperty()`获取配置时，如果key不存在，将返回`null`。我们还可以提供一个默认值，这样，当key不存在的时候，就返回默认值。
>
> 写入配置文件使用`store()`方法。
>
> 由于`load(InputStream)`默认总是以ASCII编码读取字节流，所以会导致读到乱码。我们需要用另一个重载方法`load(Reader)`读取。

### 使用Set

`Set`用于存储不重复的元素集合，它主要提供以下几个方法：

- 将元素添加进`Set<E>`：`boolean add(E e)`
- 将元素从`Set<E>`删除：`boolean remove(Object e)`
- 判断是否包含元素：`boolean contains(Object e)`

因为放入`Set`的元素和`Map`的key类似，都要正确实现`equals()`和`hashCode()`方法，否则该元素无法正确地放入`Set`。

最常用的`Set`实现类是`HashSet`，实际上，`HashSet`仅仅是对`HashMap`的一个简单封装，

`Set`接口并不保证有序，而`SortedSet`接口则保证元素是有序的：

- `HashSet`是无序的，因为它实现了`Set`接口，并没有实现`SortedSet`接口；
- `TreeSet`是有序的，因为它实现了`SortedSet`接口。

### 使用Queue

**单向队列**

队列`Queue`实现了一个先进先出（FIFO）的数据结构：

- `int size()`：获取队列长度；
- `boolean add(E)`/`boolean offer(E)`：添加元素到队尾；
- `E remove()`/`E poll()`：获取队首元素并从队列中删除；前者失败抛异常，后者返回false或null；
- `E element()`/`E peek()`：获取队首元素但并不从队列中删除。

### 使用PriorityQueue

**优先队列**：大顶堆小顶堆

放入`PriorityQueue`的元素，必须实现`Comparable`接口，`PriorityQueue`会根据元素的排序顺序决定出队的优先级。

### 使用Deque

**双向队列**：两边都可以进，也可以出

`Deque`实现了一个双端队列（Double Ended Queue），它可以：

- 将元素添加到队尾或队首：`addLast()`/`offerLast()`/`addFirst()`/`offerFirst()`；
- 从队首／队尾获取元素并删除：`removeFirst()`/`pollFirst()`/`removeLast()`/`pollLast()`；
- 从队首／队尾获取元素但不删除：`getFirst()`/`peekFirst()`/`getLast()`/`peekLast()`；
- 总是调用`xxxFirst()`/`xxxLast()`以便与`Queue`的方法区分开；
- 避免把`null`添加到队列。

### 使用Stack

在Java中，我们用`Deque`可以实现`Stack`的功能，注意只调用`push()`/`pop()`/`peek()`方法，避免调用`Deque`的其他方法。

- 把元素压栈：`push(E)`/`addFirst(E)`；
- 把栈顶的元素“弹出”：`pop()`/`removeFirst()`；
- 取栈顶元素但不弹出：`peek()`/`peekFirst()`。

为什么Java的集合类没有单独的`Stack`接口呢？因为有个遗留类名字就叫`Stack`，出于兼容性考虑，所以没办法创建`Stack`接口，只能用`Deque`接口来“模拟”一个`Stack`了。

### 使用Iterator

编译器把`for each`循环通过`Iterator`改写为了普通的`for`循环：

```java
for (Iterator<String> it = list.iterator(); it.hasNext(); ) {
     String s = it.next();
     System.out.println(s);
}
```

想要使用`for each`循环，只需满足以下条件：

- 集合类实现`Iterable`接口，该接口要求返回一个`Iterator`对象；
- 用`Iterator`对象迭代集合内部数据。

示例：

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        ReverseList<String> rlist = new ReverseList<>();
        rlist.add("Apple");
        rlist.add("Orange");
        rlist.add("Pear");
        for (String s : rlist) {
            System.out.println(s);
        }
    }
}

class ReverseList<T> implements Iterable<T> {

    private List<T> list = new ArrayList<>();

    public void add(T t) {
        list.add(t);
    }

    @Override
    public Iterator<T> iterator() {
        return new ReverseIterator(list.size());
    }

    class ReverseIterator implements Iterator<T> {
        int index;

        ReverseIterator(int index) {
            this.index = index;
        }

        @Override
        public boolean hasNext() {
            return index > 0;
        }

        @Override
        public T next() {
            index--;
            return ReverseList.this.list.get(index);
        }
    }
}

```

### 使用Collections

`Collections`是JDK提供的工具类，同样位于`java.util`包中。它提供了一系列静态方法，能更方便地操作各种集合。



`Collections`提供了一系列方法来创建空集合：

- 创建空List：`List<T> emptyList()`
- 创建空Map：`Map<K, V> emptyMap()`
- 创建空Set：`Set<T> emptySet()`

要注意到返回的空集合是不可变集合，无法向其中添加或删除元素。

`Collections`提供了一系列方法来创建一个单元素集合：

- 创建一个元素的List：`List<T> singletonList(T o)`
- 创建一个元素的Map：`Map<K, V> singletonMap(K key, V value)`
- 创建一个元素的Set：`Set<T> singleton(T o)`

`Collections`还提供了一组方法把可变集合封装成不可变集合：

- 封装成不可变List：`List<T> unmodifiableList(List<? extends T> list)`
- 封装成不可变Set：`Set<T> unmodifiableSet(Set<? extends T> set)`
- 封装成不可变Map：`Map<K, V> unmodifiableMap(Map<? extends K, ? extends V> m)`

排序： Collections.sort(list);

洗牌：Collections.shuffle(list);

---

## IO

1. 在Java中，`InputStream`代表输入字节流，`OuputStream`代表输出字节流，这是最基本的两种IO流。
2. Java提供了`Reader`和`Writer`表示字符流，字符流传输的最小数据单位是`char`。
3. 因此，`Reader`和`Writer`本质上是一个能自动编解码的`InputStream`和`OutputStream`。
4. 如果数据源不是文本，就只能使用`InputStream`，如果数据源是文本，使用Reader更方便一些。`Writer`和`OutputStream`是类似的。

### File对象

> 小知识：
>
> 1. Java的标准库`java.io`提供了`File`对象来操作文件和目录。
>
> 2. 要构造一个`File`对象，需要传入文件路径：`File f = new File("C:\\Windows\\notepad.exe");`
>
> 3. 注意Windows平台使用`\`作为路径分隔符，在Java字符串中需要用`\\`表示一个`\`。Linux平台使用`/`作为路径分隔符：
>
> 4. File对象有3种形式表示的路径，一种是`getPath()`，返回构造方法传入的路径，一种是`getAbsolutePath()`，返回绝对路径，一种是`getCanonicalPath`，它和绝对路径类似，但是返回的是规范路径。
>
> 5. `File`对象既可以表示文件，也可以表示目录。特别要注意的是，构造一个`File`对象，
>
> 6. 使用`File`对象的方法
>
>    - `boolean canRead()`：是否可读；
>    - `boolean canWrite()`：是否可写；
>    - `boolean canExecute()`：是否可执行；
>    - `long length()`：文件字节大小。
>    - `createNewFile()`创建一个新文件，用`delete()`删除该文件
>    - `createTempFile()`来创建一个临时文件，以及`deleteOnExit()`在JVM退出时自动删除该文件
>    - 目录：
>    - `list()`和`listFiles()`列出目录下的文件和子目录名
>    - `boolean mkdir()`：创建当前File对象表示的目录；
>    - `boolean mkdirs()`：创建当前File对象表示的目录，并在必要时将不存在的父目录也创建出来；
>    - `boolean delete()`：删除当前File对象表示的目录，当前目录必须为空才能删除成功。
>
> 7. 如果需要对目录进行复杂的拼接、遍历等操作，使用`Path`对象更方便。
>
>    ```java
>    import java.io.*;
>    import java.nio.file.*;
>    
>    public class Main {
>        public static void main(String[] args) throws IOException {
>            Path p1 = Paths.get(".", "project", "study"); // 构造一个Path对象
>            
>            Path p2 = p1.toAbsolutePath(); // 转换为绝对路径
>            Path p3 = p2.normalize(); // 转换为规范路径
>            File f = p3.toFile(); // 转换为File对象
>            
>            System.out.println("\n"+p1+"\n"+p2+"\n"+f);
>            for (Path p : Paths.get("..").toAbsolutePath()) { // 可以直接遍历Path
>                System.out.println("  " + p);
>            }
>        }
>    }
>    ```

### InputStream

```java
// 文件输入流 读取文件内容
public void readFile() throws IOException {
    InputStream input = null;
    try {
        input = new FileInputStream("src/readme.txt");
        int n;
        while ((n = input.read()) != -1) { // 利用while同时读取并判断
            System.out.println(n);
        }
    } finally {
        // 即使读取出现问题，也能关闭 流
        if (input != null) { input.close(); }
    }
}

// java7 引入的新的try(resource)的语法，只需要编写try语句，让编译器自动为我们关闭资源。
public void readFile() throws IOException {
    try (InputStream input = new FileInputStream("src/readme.txt")) {
        int n;
        while ((n = input.read()) != -1) {
            System.out.println(n);
        }
    } // 编译器在此自动为我们写入finally并调用close()
}
// 实际上，编译器并不会特别地为InputStream加上自动关闭。编译器只看try(resource = ...)中的对象是否实现了java.lang.AutoCloseable接口，如果实现了，就自动加上finally语句并调用close()方法。InputStream和OutputStream都实现了这个接口，因此，都可以用在try(resource)中。
```

1. `InputStream`并不是一个接口，而是一个抽象类，它是所有输入流的超类。这个抽象类定义的一个最重要的方法就是`int read()`，返回字节表示的`int`值（0~255）。如果已读到末尾，返回`-1`表示不能继续读取了。
2. 在调用`InputStream`的`read()`方法读取数据时，我们说`read()`方法是阻塞（Blocking）的。
3. `ByteArrayInputStream`实际上是把一个`byte[]`数组在内存中变成一个`InputStream`，虽然实际应用不多，但测试的时候，可以用它来构造一个`InputStream`。

### OutputStream

> 小知识：
>
> 1. 为什么要有`flush()`？因为向磁盘、网络写入数据的时候，出于效率的考虑，操作系统并不是输出一个字节就立刻写入到文件或者发送到网络，而是把输出的字节先放到内存的一个缓冲区里（本质上就是一个`byte[]`数组），等到缓冲区写满了，再一次性写入文件或者网络。对于很多IO设备来说，一次写一个字节和一次写1000个字节，花费的时间几乎是完全一样的，所以`OutputStream`有个`flush()`方法，能强制把缓冲区内容输出。
>
> 2. 通常情况下，我们不需要调用这个`flush()`方法，因为==缓冲区写满了==`OutputStream`会自动调用它，并且，==在调用`close()`方法关闭`OutputStream`之前==，也会自动调用`flush()`方法。但是，在某些情况下，我们必须手动调用`flush()`方法。
>
> 3. 和`InputStream`一样，`OutputStream`的`write()`方法也是阻塞的。
>
> 4. `ByteArrayOutputStream`实际上是把一个`byte[]`数组在内存中变成一个`OutputStream`，虽然实际应用不多，但测试的时候，可以用它来构造一个`OutputStream`。
>
> 5. 同时操作多个`AutoCloseable`资源时，在`try(resource) { ... }`语句中可以同时写出多个资源，用`;`隔开。例如，同时读写两个文件：
>
>    ```java
>    // 读取input.txt，写入output.txt:
>    try (InputStream input = new FileInputStream("input.txt");
>         OutputStream output = new FileOutputStream("output.txt"))
>    {
>        input.transferTo(output); // transferTo的作用是?
>    }
>    ```

### Filter模式

上述这种通过一个“基础”组件再叠加各种“附加”功能组件的模式，称之为Filter模式（或者装饰器模式：Decorator）。它可以让我们通过少量的类来实现各种功能的组合

> 小总结：
>
> Java的IO标准库使用Filter模式为`InputStream`和`OutputStream`增加功能：
>
> - 可以把一个`InputStream`和任意个`FilterInputStream`组合；
> - 可以把一个`OutputStream`和任意个`FilterOutputStream`组合。
>
> Filter模式可以在运行期动态增加功能（又称Decorator模式）。

### 操作Zip

因为本质上jar包就是zip包，只是额外附加了一些固定的描述文件`MANIFEST.MF`。

```java
// 读取zip
// 创建一个ZipInputStream，通常是传入一个FileInputStream作为数据源，
// 然后，循环调用getNextEntry()，直到返回null，表示zip流结束。
// 一个ZipEntry表示一个压缩文件或目录，如果是压缩文件，我们就用read()方法不断读取，直到返回-1：
try (ZipInputStream zip = new ZipInputStream(new FileInputStream(...))) {
    ZipEntry entry = null;
    while ((entry = zip.getNextEntry()) != null) {
        String name = entry.getName();
        if (!entry.isDirectory()) {
            int n;
            while ((n = zip.read()) != -1) {
                // ...
            }
        }
    }
}
// 写入zip
// 先创建一个ZipOutputStream，通常是包装一个FileOutputStream，
// 然后，每写入一个文件前，先调用putNextEntry()，然后用write()写入byte[]数据，
// 写入完毕后调用closeEntry()结束这个文件的打包。
try (ZipOutputStream zip = new ZipOutputStream(new FileOutputStream(...))) {
    File[] files = // ...
    for (File file : files) {
        zip.putNextEntry(new ZipEntry(file.getName()));
        zip.write(getFileDataAsBytes(file));
        zip.closeEntry();
    }
}
```

### 读取classpath资源

在classpath中的资源文件，路径总是以`／`开头，我们先获取当前的`Class`对象，然后调用`getResourceAsStream()`就可以直接从classpath读取任意的资源文件。如果资源文件不存在，它将返回`null`。

```java
try (InputStream input = getClass().getResourceAsStream("/default.properties")) {
    if (input != null) {
        // TODO:
    }
}
```

### 序列化

1. 序列化是指把一个Java对象变成二进制内容，本质上就是一个`byte[]`数组。
2. 因为序列化后可以把`byte[]`保存到文件中，或者把`byte[]`通过网络传输到远程，这样，就相当于把Java对象存储到文件或者通过网络传输出去了。
3. 一个Java对象要能序列化，必须实现一个特殊的`java.io.Serializable`接口，`Serializable`接口没有定义任何方法，它是一个空接口。我们把这样的空接口称为“标记接口”（Marker Interface），实现了标记接口的类仅仅是给自身贴了个“标记”，并没有增加任何方法。
4. 把一个Java对象变为`byte[]`数组，需要使用`ObjectOutputStream`。它负责把一个Java对象写入一个字节流：
5. 为了避免这种class定义变动导致的不兼容，Java的序列化允许class定义一个特殊的`serialVersionUID`静态变量，用于标识Java类的序列化“版本”，通常可以由IDE自动生成。如果增加或修改了字段，可以改变`serialVersionUID`的值，这样就能自动阻止不匹配的class版本：

### Reader

> 小知识：
>
> 1. 和`InputStream`的区别是，`InputStream`是一个字节流，即以`byte`为单位读取，而`Reader`是一个字符流，即以`char`为单位读取：
>
> 2. 要避免乱码问题，我们需要在创建`FileReader`时指定编码：
>
>    ```java
>    Reader reader = new FileReader("src/readme.txt", StandardCharsets.UTF_8);
>    ```
>
> 3. `CharArrayReader`可以在内存中模拟一个`Reader`，它的作用实际上是把一个`char[]`数组变成一个`Reader`，这和`ByteArrayInputStream`非常类似
>
>    ```java
>    try (Reader reader = new CharArrayReader("Hello".toCharArray())) {
>    ```
>
> 4. `StringReader`可以直接把`String`作为数据源，它和`CharArrayReader`几乎一样：
>
>    ```java
>    try (Reader reader = new StringReader("Hello")) {
>    ```
>
> 5. 既然`Reader`本质上是一个基于`InputStream`的`byte`到`char`的转换器，那么，如果我们已经有一个`InputStream`，想把它转换为`Reader`，是完全可行的。`InputStreamReader`就是这样一个转换器，它可以把任何`InputStream`转换为`Reader`。
>
>    ```java
>    // 持有InputStream:
>    InputStream input = new FileInputStream("src/readme.txt");
>    // 变换为Reader:
>    Reader reader = new InputStreamReader(input, "UTF-8");
>    
>    try (Reader reader = new InputStreamReader(new FileInputStream("src/readme.txt"), "UTF-8")) {
>        // TODO:
>    }
>    ```

### PrintStream 和 PrintWriter

`PrintStream`是一种`FilterOutputStream`，它在==`OutputStream`的接口==上，额外提供了一些写入各种数据类型的方法：

- 写入`int`：`print(int)`
- 写入`boolean`：`print(boolean)`
- 写入`String`：`print(String)`
- 写入`Object`：`print(Object)`，实际上相当于`print(object.toString())`

- `println()`方法，它会自动加上换行符。

我们经常使用的`System.out.println()`实际上就是使用`PrintStream`打印各种数据。其中，`System.out`是系统默认提供的`PrintStream`，表示标准输

而`PrintWriter`则是扩展了==`Writer`接口==，它的`print()`/`println()`方法最终输出的是`char`数据。

### 使用Files

1. 虽然`Files`和`Paths`是`java.nio`包里面的类，但他俩封装了很多读写文件的简单方法，
2. `Files`工具类还有`copy()`、`delete()`、`exists()`、`move()`等快捷方法操作文件和目录。
3. `Files`提供的读写方法，受内存限制，只能读写小文件，例如配置文件等，不可一次读入几个G的大文件。读写大型文件仍然要使用文件流，每次只读写一部分文件内容。

## 日期与时间（）

### Date和Calendar

`Epoch Time`是计算从1970年1月1日零点（格林威治时区／GMT+00:00）到现在所经历的秒数，计算机存储Epoch Time

要获取当前时间戳，可以使用`System.currentTimeMillis()`，这是Java程序获取时间戳最常用的方法。

- 一套定义在`java.util`这个包里面，主要包括`Date`、`Calendar`和`TimeZone`这几个类；
- 一套新的API是在Java 8引入的，定义在`java.time`这个包里面，主要包括`LocalDateTime`、`ZonedDateTime`、`ZoneId`等。

使用`SimpleDateFormat`对一个`Date`进行转换。它用预定义的字符串表示格式化：

`Calendar`可以用于获取并设置年、月、日、时、分、秒，它和`Date`比，主要多了一个可以做简单的日期和时间运算的功能。

`Calendar`只有一种方式获取，即`Calendar.getInstance()`，而且一获取到就是当前时间。如果我们想给它设置成特定的一个日期和时间，就必须先清除所有字段：

利用`Calendar.getTime()`可以将一个`Calendar`对象转换成`Date`对象，然后就可以用`SimpleDateFormat`进行格式化了。

利用`Calendar`进行时区转换的步骤是：

1. 清除所有字段；
2. 设定指定时区；
3. 设定日期和时间；
4. 创建`SimpleDateFormat`并设定目标时区；
5. 格式化获取的`Date`对象（注意`Date`对象无时区信息，时区信息存储在`SimpleDateFormat`中）。

### LocalDateTime

从Java 8开始，`java.time`包提供了新的日期和时间API，它们是不变类，默认按ISO 8601标准格式化和解析。主要涉及的类型有：

- 本地日期和时间：`LocalDateTime`，`LocalDate`，`LocalTime`；
- 带时区的日期和时间：`ZonedDateTime`；
- 时刻：`Instant`；
- 时区：`ZoneId`，`ZoneOffset`；
- 时间间隔：`Duration`。

以及一套新的用于取代`SimpleDateFormat`的格式化类型`DateTimeFormatter`。

## 单元测试

### 编写JUnit测试

> 1. 所谓测试驱动开发，是指先编写接口，紧接着编写测试。编写完测试后，我们才开始真正编写实现代码。在编写实现代码的过程中，一边写，一边测，什么时候测试全部通过了，那就表示编写的实现完成了：
> 2. JUnit就会给出成功的测试和失败的测试，还可以生成测试报告，不仅包含测试的成功率，还可以统计测试的代码覆盖率，即被测试的代码本身有多少经过了测试。对于高质量的代码来说，测试覆盖率应该在80%以上。
> 3. 一个JUnit测试包含若干`@Test`方法，并使用`Assertions`进行断言，注意浮点数`assertEquals()`要指定`delta`。

### 使用Fixture

在测试的时候，我们经常遇到一个对象需要初始化，测试完可能还需要清理的情况。

JUnit提供了编写测试前准备、测试后清理的固定代码，我们称之为Fixture。

通过`@BeforeEach`来初始化，通过`@AfterEach`来清理资源。标记为`@BeforeEach`和`@AfterEach`的方法，它们会在运行每个`@Test`方法前后自动运行

`@BeforeAll`和`@AfterAll`在所有`@Test`方法运行前后仅运行一次，因此，它们只能初始化静态变量，

因此，我们总结出编写Fixture的套路如下：

1. 对于实例变量，在`@BeforeEach`中初始化，在`@AfterEach`中清理，它们在各个`@Test`方法中互不影响，因为是不同的实例；
2. 对于静态变量，在`@BeforeAll`中初始化，在`@AfterAll`中清理，它们在各个`@Test`方法中均是唯一实例，会影响各个`@Test`方法。

大多数情况下，使用`@BeforeEach`和`@AfterEach`就足够了。只有某些测试资源初始化耗费时间太长，以至于我们不得不尽量“复用”时才会用到`@BeforeAll`和`@AfterAll`。

### 异常测试

测试异常可以使用`assertThrows()`，期待捕获到指定类型的异常；

### 条件测试

这是因为注释掉`@Test`，JUnit就不知道这是个测试方法，而加上`@Disabled`，JUnit仍然识别出这是个测试方法，只是暂时不运行。

类似`@Disabled`这种注解就称为条件测试，JUnit根据不同的条件注解，决定是否运行当前的`@Test`方法。

不在Windows平台执行的测试，可以加上`@DisabledOnOs(OS.WINDOWS)`：

只能在Java 9或更高版本执行的测试，可以加上`@DisabledOnJre(JRE.JAVA_8)`：

只能在64位操作系统上执行的测试，可以用`@EnabledIfSystemProperty(named = "os.arch", matches = ".*64.*")`判断

需要传入环境变量`DEBUG=true`才能执行的测试，可以用`@EnabledIfEnvironmentVariable(named = "DEBUG", matches = "true")`：

### 参数化测试

JUnit提供了一个`@ParameterizedTest`注解，用来进行参数化测试。

@ValueSource(ints = { 0, 1, 5, 100 })j

```java
@ParameterizedTest
@MethodSource
void testCapitalize(String input, String result) {
    assertEquals(result, StringUtils.capitalize(input));
}

// 同名的静态方法来提供测试参数
static List<Arguments> testCapitalize() {
    return List.of( // arguments:
            Arguments.arguments("abc", "Abc"), //
            Arguments.arguments("APPLE", "Apple"), //
            Arguments.arguments("gooD", "javaGood"));
}
```

```java
@ParameterizedTest
@CsvSource({ "abc, Abc", "APPLE, Apple", "gooD, Good" })
void testCapitalize(String input, String result) {
    assertEquals(result, StringUtils.capitalize(input));
}
// @CsvSource就很不方便。这个时候，我们可以把测试数据提到一个独立的CSV文件中，然后标注上@CsvFileSource
// @CsvFileSource(resources = { "/test-capitalize.csv" })
```

## 正则表达式

### 匹配规则

单个字符的匹配规则如下：

| 正则表达式 | 规则                     | 可以匹配                       |
| :--------- | :----------------------- | :----------------------------- |
| `A`        | 指定字符                 | `A`                            |
| `\u548c`   | 指定Unicode字符          | `和`                           |
| `.`        | 任意字符                 | `a`，`b`，`&`，`0`             |
| `\d`       | 数字0~9                  | `0`~`9`                        |
| `\w`       | 大小写字母，数字和下划线 | `a`~`z`，`A`~`Z`，`0`~`9`，`_` |
| `\s`       | 空格、Tab键              | 空格，Tab                      |
| `\D`       | 非数字                   | `a`，`A`，`&`，`_`，……         |
| `\W`       | 非\w                     | `&`，`@`，`中`，……             |
| `\S`       | 非\s                     | `a`，`A`，`&`，`_`，……         |

多个字符的匹配规则如下：

| 正则表达式 | 规则             | 可以匹配                 |
| :--------- | :--------------- | :----------------------- |
| `A*`       | 任意个数字符     | 空，`A`，`AA`，`AAA`，…… |
| `A+`       | 至少1个字符      | `A`，`AA`，`AAA`，……     |
| `A?`       | 0个或1个字符     | 空，`A`                  |
| `A{3}`     | 指定个数字符     | `AAA`                    |
| `A{2,3}`   | 指定范围个数字符 | `AA`，`AAA`              |
| `A{2,}`    | 至少n个字符      | `AA`，`AAA`，`AAAA`，……  |
| `A{0,3}`   | 最多n个字符      | 空，`A`，`AA`，`AAA`     |

复杂匹配规则主要有：

| 正则表达式 | 规则                 | 可以匹配                             |
| :--------- | :------------------- | :----------------------------------- |
| ^          | 开头                 | 字符串开头                           |
| $          | 结尾                 | 字符串结束                           |
| [ABC]      | […]内任意字符        | A，B，C                              |
| [A-F0-9xy] | 指定范围的字符       | `A`，……，`F`，`0`，……，`9`，`x`，`y` |
| [^A-F]     | 指定范围外的任意字符 | 非`A`~`F`                            |
| AB\|CD\|EF | AB或CD或EF           | `AB`，`CD`，`EF`                     |

### 分组匹配

正则表达式用`(...)`分组可以通过`Matcher`对象快速提取子串：

- `group(0)`表示匹配的整个字符串；
- `group(1)`表示第1个子串，`group(2)`表示第2个子串，以此类推。

### 非贪婪匹配

正则表达式匹配默认使用贪婪匹配，可以使用`?`表示对某一规则进行非贪婪匹配。

### 搜索和替换

使用正则表达式可以：

- 分割字符串：`String.split()`
- 搜索子串：`Matcher.find()`
- 替换字符串：`String.replaceAll()`。使用`replaceAll()`的时候，我们传入的第二个参数可以使用`$1`、`$2`来反向引用匹配到的子串。

## 加密与安全

### 编码算法

URL编码：

- 如果字符是A~ Z，a~ z，0~9以及-、_、.、*，则保持不变；
- 如果是其他字符，先转换为UTF-8编码，然后对每个字节以`%XX`表示。
- String encoded = URLEncoder.encode("中文!", StandardCharsets.UTF_8);

Base64编码：

- ```java
  byte[] input = new byte[] { (byte) 0xe4, (byte) 0xb8, (byte) 0xad };
  String b64encoded = Base64.getEncoder().encodeToString(input);
  
  // base64 URL的编码
  byte[] input = new byte[] { 0x01, 0x02, 0x7f, 0x00 };
  String b64encoded = Base64.getUrlEncoder().encodeToString(input);
  ```

如果输入的`byte[]`数组长度不是3的整数倍肿么办？这种情况下，需要对输入的末尾补一个或两个`0x00`，编码后，在结尾加一个`=`表示补充了1个`0x00`，加两个`=`表示补充了2个`0x00`，解码的时候，去掉末尾补充的一个或两个`0x00`即可。，因为编码后的长度加上`=`总是4的倍数，所以即使不加`=`也可以计算出原始输入的`byte[]`。Base64编码的时候可以用`withoutPadding()`去掉`=`，解码出来的结果是一样的

Base64编码的目的是把任意二进制数据编码为文本（顺序截取用字符表示），但编码后数据量会增加1/3。

### 哈希算法

哈希算法（Hash）又称摘要算法（Digest），它的作用是：对任意一组输入数据进行计算，得到一个固定长度的输出摘要。

- 相同的输入一定得到相同的输出；
- 不同的输入大概率得到不同的输出。

哈希算法的目的就是为了验证原始数据是否被篡改

Java字符串的`hashCode()`就是一个哈希算法，它的输入是任意字符串，输出是固定的4字节`int`整数：

哈希碰撞是指，两个不同的输入得到了相同的输出：

```java
    // 创建一个MessageDigest实例:
    MessageDigest md = MessageDigest.getInstance("MD5"); // 使用 MD5加密，也可以使用其他的
    // 反复调用update输入数据:
    md.update("Hello".getBytes("UTF-8"));
    md.update("World".getBytes("UTF-8"));
    byte[] result = md.digest(); // 16 bytes: 68e109f0f40ca72a15e05cc22786f8e6
    System.out.println(new BigInteger(1, result).toString(16));

//  注意：MD5因为输出长度较短，短时间内破解是可能的，目前已经不推荐使用。
```
因为相同的输入永远会得到相同的输出，因此，如果输入被修改了，得到的输出就会不同。

哈希算法的另一个重要用途是存储用户口令。如果直接将用户的原始口令存放到数据库中，会产生极大的安全风险。

使用哈希口令时，还要注意防止==彩虹表==攻击。

即使用户使用了常用口令，我们也可以采取措施来抵御彩虹表攻击，方法是对每个口令额外添加随机数，这个方法称之为==加盐==（salt）。

### BouncyCastle

[BouncyCastle](https://www.bouncycastle.org/)就是一个提供了很多哈希算法和加密算法的第三方库。它提供了Java标准库没有的一些算法，jar包是`bcprov-jdk15on-xxx.jar`，

```java
        // 注册BouncyCastle:
        Security.addProvider(new BouncyCastleProvider());
        // 按名称正常调用:
        MessageDigest md = MessageDigest.getInstance("RipeMD160");
        md.update("HelloWorld".getBytes("UTF-8"));
        byte[] result = md.digest();
        System.out.println(new BigInteger(1, result).toString(16));
```

### Hmac算法

salt可以看作是一个额外的“认证码”，同样的输入，不同的认证码，会产生不同的输出。因此，要验证输出的哈希，必须同时提供“认证码”。

Hmac算法就是一种基于密钥的消息认证码算法，它的全称是Hash-based Message Authentication Code，是一种更安全的消息摘要算法。Hmac算法总是和某种哈希算法配合起来用的。

和MD5相比，使用HmacMD5的步骤是：

1. 通过名称`HmacMD5`获取`KeyGenerator`实例；
2. 通过`KeyGenerator`创建一个`SecretKey`实例；
3. 通过名称`HmacMD5`获取`Mac`实例；
4. 用`SecretKey`初始化`Mac`实例；
5. 对`Mac`实例反复调用`update(byte[])`输入数据；
6. 调用`Mac`实例的`doFinal()`获取最终的哈希值。

```java
    KeyGenerator keyGen = KeyGenerator.getInstance("HmacMD5");
    SecretKey key = keyGen.generateKey();
    // 打印随机生成的key:
    byte[] skey = key.getEncoded();
    System.out.println(new BigInteger(1, skey).toString(16));
    Mac mac = Mac.getInstance("HmacMD5");
    mac.init(key);
    mac.update("HelloWorld".getBytes("UTF-8"));
    byte[] result = mac.doFinal();
    System.out.println(new BigInteger(1, result).toString(16));

// 解码
        byte[] hkey = new byte[] { 106, 70, -110, 125, 39, -20, 52, 56, 85, 9, -19, -72, 52, -53, 52, -45, -6, 119, -63,
                30, 20, -83, -28, 77, 98, 109, -32, -76, 121, -106, 0, -74, -107, -114, -45, 104, -104, -8, 2, 121, 6,
                97, -18, -13, -63, -30, -125, -103, -80, -46, 113, -14, 68, 32, -46, 101, -116, -104, -81, -108, 122,
                89, -106, -109 };

        SecretKey key = new SecretKeySpec(hkey, "HmacMD5");
        Mac mac = Mac.getInstance("HmacMD5");
        mac.init(key);
        mac.update("HelloWorld".getBytes("UTF-8"));
        byte[] result = mac.doFinal();
        System.out.println(Arrays.toString(result));
        // [126, 59, 37, 63, 73, 90, 111, -96, -77, 15, 82, -74, 122, -55, -67, 54]
```
### 对称加密算法

1. 对称加密算法就是传统的用一个密码进行加密和解密。常用算法有DES、AES和IDEA等；
2. 密钥长度由算法设计决定，AES的密钥长度是128/192/256位；
3. 使用对称加密算法需要指定算法名称、工作模式和填充模式。

```java

```

### 口令加密算法

实际上用户输入的口令并不能直接作为AES的密钥进行加密（除非长度恰好是128/192/256位），并且用户输入的口令一般都有规律，安全性远远不如安全随机数产生的随机口令。因此，用户输入的口令，通常还需要使用PBE算法，采用随机数杂凑计算出真正的密钥，再进行加密。

**小结**

1. PBE算法通过用户口令和安全的随机salt计算出Key，然后再进行加密；
2. Key通过口令和安全的随机salt计算得出，大大提高了安全性；
3. PBE算法内部使用的仍然是标准对称加密算法（例如AES）。

### 密钥交换算法

DH算法的本质就是双方各自生成自己的私钥和公钥，私钥仅对自己可见，然后交换公钥，并根据自己的私钥和对方的公钥，生成最终的密钥`secretKey`，DH算法通过数学定律保证了双方各自计算出的`secretKey`是相同的。

DH算法是一种密钥交换协议，通信双方通过不安全的信道协商密钥，然后进行对称加密传输。

DH算法没有解决中间人攻击，即甲乙双方并不能确保与自己通信的是否真的是对方。

### 非对称加密算法

1. 可见非对称加密实际上应用在第一步，即加密“AES口令”。这也是我们在浏览器中常用的HTTPS协议的做法，即浏览器和服务器先通过RSA交换AES口令，接下来双方通信实际上采用的是速度较快的AES对称加密，而不是缓慢的RSA非对称加密。
2. 非对称加密就是加密和解密使用的不是相同的密钥，只有同一个公钥-私钥对才能正常加解密；
3. 只使用非对称加密算法不能防止中间人攻击。

### 签名算法

因此，私钥加密得到的密文实际上就是数字签名，要验证这个签名是否正确，只能用私钥持有者的公钥进行解密验证。使用数字签名的目的是为了确认某个信息确实是由某个发送方发送的，任何人都不可能伪造消息，并且，发送方也不能抵赖。

私钥就相当于用户身份。而公钥用来给外部验证用户身份。

数字签名就是用发送方的私钥对原始数据进行签名，只有用发送方公钥才能通过签名验证。

数字签名用于：

- 防止伪造；
- 防止抵赖；
- 检测篡改。

常用的数字签名算法包括：MD5withRSA／SHA1withRSA／SHA256withRSA／SHA1withDSA／SHA256withDSA／SHA512withDSA／ECDSA等。

### 数字证书

1. 摘要算法用来确保数据没有被篡改，非对称加密算法可以对数据进行加解密，签名算法可以确保数据完整性和抗否认性，把这些算法集合到一起，并搞一套完善的标准，这就是==数字证书==。因此，数字证书就是集合了多种密码学算法，用于实现数据加解密、身份认证、签名等多种功能的一种安全标准。
2. 数字证书采用链式签名管理，顶级的Root CA证书已内置在操作系统中。
3. 数字证书存储的是公钥，可以安全公开，而私钥必须严格保密。

## 多线程

### 创建新线程

Java语言内置了多线程支持。当Java程序启动的时候，实际上是启动了一个JVM进程，然后，JVM启动主线程来执行`main()`方法。在`main()`方法中，我们又可以启动其他线程。

注意到`start()`方法会在内部自动调用实例的`run()`方法。要特别注意：直接调用`Thread`实例的`run()`方法是无效的，直接调用`run()`方法，相当于调用了一个普通的Java方法，当前线程并没有任何改变，也不会启动新线程。

对线程设定优先级，`Thread.setPriority(int n) // 1~10, 默认值5`

> 小总结：
>
> 1. Java用`Thread`对象表示一个线程，通过调用`start()`启动一个新线程；
> 2. 一个线程对象只能调用一次`start()`方法；
> 3. 线程的执行代码写在`run()`方法中；
> 4. 线程调度由操作系统决定，程序本身无法决定调度顺序；
> 5. `Thread.sleep()`可以把当前线程暂停一段时间。

### 线程的状态

Java线程的状态有以下几种：

- New：新创建的线程，尚未执行；
- Runnable：运行中的线程，正在执行`run()`方法的Java代码；
- Blocked：运行中的线程，因为某些操作被阻塞而挂起；
- Waiting：运行中的线程，因为某些操作在等待中；
- Timed Waiting：运行中的线程，因为执行`sleep()`方法正在计时等待；
- Terminated：线程已终止，因为`run()`方法执行完毕。

线程对象`t`调用`join()`方法可以让主线程等待其执行结束。如果`t`线程已经结束，对实例`t`调用`join()`会立刻返回。此外，`join(long)`的重载方法也可以指定一个等待时间，超过等待时间后就不再继续等待。

### 中断线程

中断一个线程非常简单，只需要在其他线程中对目标线程调用`interrupt()`方法，目标线程需要反复检测自身状态是否是interrupted状态，如果是，就立刻结束运行。

线程对象调用其自身的interrupt方法就会中断（发出中断请求）。

我们通常会用一个`running`标志位来标识线程是否应该继续运行，在外部线程中，通过把`HelloThread.running`置为`false`，就可以让线程结束：

线程间共享变量需要使用`volatile`关键字标记，确保每个线程都能读取到更新后的变量值。

*为什么要对线程间共享的变量用关键字`volatile`声明？这涉及到Java的内存模型。在Java虚拟机中，变量的值保存在主内存中，但是，当线程访问变量时，它会先获取一个副本，并保存在自己的工作内存中。如果线程修改了变量的值，虚拟机会在某个时刻把修改后的值回写到主内存，但是，这个时间是不确定的！*

`volatile`关键字的目的是告诉虚拟机：

- 每次访问变量时，总是获取主内存的最新值；
- 每次修改变量后，立刻回写到主内存。

`volatile`关键字解决的是可见性问题：当一个线程修改了某个共享变量的值，其他线程能够立刻看到修改后的值。

> 小总结：
>
> 1. 对目标线程调用`interrupt()`方法可以请求中断一个线程，目标线程通过检测`isInterrupted()`标志获取自身是否已中断。如果目标线程处于等待状态，该线程会捕获到`InterruptedException`；
> 2. 目标线程检测到`isInterrupted()`为`true`或者捕获了`InterruptedException`都应该立刻结束自身线程；
> 3. 通过标志位判断需要正确使用`volatile`关键字；
> 4. `volatile`关键字解决了共享变量在线程间的可见性问题。

### 守护线程

但是有一种线程的目的就是无限循环，例如，一个定时触发任务的线程。

如何创建守护线程呢？方法和普通线程一样，只是在调用`start()`方法前，调用`setDaemon(true)`把该线程标记为守护线程。

守护线程是为其他线程服务的线程；

所有非守护线程都执行完毕后，虚拟机退出；

守护线程不能持有需要关闭的资源（如打开文件等）。

### 线程同步

这说明多线程模型下，要保证逻辑正确，对共享变量进行读写时，必须保证一组指令以原子方式执行：即某一个线程执行时，其他线程必须等待。

1. 通过加锁和解锁的操作，就能保证3条指令总是在一个线程执行期间，不会有其他线程会进入此指令区间。
2. 即使在执行期线程被操作系统中断执行，其他线程也会因为无法获得锁导致无法进入此指令区间。
3. 只有执行线程将锁释放后，其他线程才有机会获得锁并执行。
4. 这种加锁和解锁之间的代码块我们称之为临界区（Critical Section），任何时候临界区最多只有一个线程能执行。

> 把临界区看作一个房间，房间里有一把锁，当一个线程进去之后，它会把门锁住不让其他线程进来，这样其他线程被拒之门外，只有等，房间里的人办完事情，把锁打开。
>
> synchronized(lock)，lock可能是一个变量或者对象或者类，把它当作锁，加锁的时候会把这个对象的状态标记为加锁（执行完解锁），当其他线程访问时会检查锁的状态 判断是否可以进去。
>
> 锁是线程可以==共享==的（所有线程都拥有，可以判断状态，决定自己是否可以访问）

Java程序使用`synchronized`关键字对一个对象进行加锁，`synchronized`保证了代码块在任意时刻最多只有一个线程能执行。

我们来概括一下如何使用`synchronized`：

1. 找出修改共享变量的线程代码块；
2. 选择一个共享实例作为锁；
3. 使用`synchronized(lockObject) { ... }`。

### 同步方法

用`synchronized`修饰的方法就是同步方法，它表示整个方法都必须用`this`实例加锁。

对`static`方法添加`synchronized`，锁住的是该类的`Class`实例。

一个类没有特殊说明，默认不是thread-safe；

### 死锁

1. JVM允许同一个线程重复获取同一个锁，这种能被同一个线程反复获取的锁，就叫做可重入锁。
2. 死锁产生的条件是多线程各自持有不同的锁，并互相试图获取对方已持有的锁，导致无限等待；
3. 避免死锁的方法是多线程获取锁的顺序要一致。

### 使用wait和notify

多线程协调运行的原则就是：当条件不满足时，线程进入等待状态；当条件满足时，线程被唤醒，继续执行任务。

`wait`和`notify`用于多线程协调运行：

- 在`synchronized`内部可以调用`wait()`使线程进入等待状态；
- 必须在已获得的锁对象上调用`wait()`方法；
- 在`synchronized`内部可以调用`notify()`或`notifyAll()`唤醒其他等待线程；
- 必须在已获得的锁对象上调用`notify()`或`notifyAll()`方法；
- 已唤醒的线程还需要重新获得锁后才能继续执行。

> 拿到锁的人，调用wait方法，把锁还回去了并且在房间里睡着了，等着下一个拿着锁的线程对象把它叫醒。

使用`notifyAll()`将唤醒所有当前正在`this`锁等待的线程，而`notify()`只会唤醒其中一个（具体哪个依赖操作系统，有一定的随机性）。

通常来说，`notifyAll()`更安全。有些时候，如果我们的代码逻辑考虑不周，用`notify()`会导致只唤醒了一个线程，而其他线程可能永远等待下去醒不过来了。

### 使用ReentrantLock（重入锁）

因为`synchronized`是Java语言层面提供的语法，所以我们不需要考虑异常，而`ReentrantLock`是Java代码实现的锁，我们就必须先获取锁，然后在`finally`中正确释放锁。

```java
public class Counter {
    private final Lock lock = new ReentrantLock();
    private int count;

    public void add(int n) {
        lock.lock(); // 加锁
        try {
            count += n;
        } finally {
            lock.unlock(); // 解锁
        }
        // or 尝试获取锁
        if (lock.tryLock(1, TimeUnit.SECONDS)) {
            // 尝试获取锁的时候，最多等待1秒。如果1秒后仍未获取到锁，tryLock()返回false，程序就可以做一些额外处理，而不是无限等待下去。
            try {
                ...
            } finally {
                lock.unlock();
            }
        }
    }
}
```

`ReentrantLock`可以替代`synchronized`进行同步；

`ReentrantLock`获取锁更安全；

必须先获取到锁，再进入`try {...}`代码块，最后使用`finally`保证释放锁；

可以使用`tryLock()`尝试获取锁。

### 使用Condition

使用`ReentrantLock`比直接使用`synchronized`更安全，可以替代`synchronized`进行线程同步。

配合使用`Condition`对象来实现`wait`和`notify`的功能。

1. `Condition`可以替代`wait`和`notify`；
2. `Condition`对象必须从`Lock`对象获取。

```java
class TaskQueue {
    private final Lock lock = new ReentrantLock(); // 返回锁
    private final Condition condition = lock.newCondition(); // 返回condition对象
    private Queue<String> queue = new LinkedList<>();

    public void addTask(String s) {
        lock.lock();
        try {
            queue.add(s);
            condition.signalAll(); // 等同于 notifyAll
        } finally {
            lock.unlock();
        }
    }

    public String getTask() {
        lock.lock();
        try {
            while (queue.isEmpty()) {
                condition.await(); // 线程等待，等同于 wait
            }
            return queue.remove();
        } finally {
            lock.unlock();
        }
    }
}
```

### 使用ReadWriteLock

使用`ReadWriteLock`可以解决这个问题，它保证：

- 只允许一个线程写入（其他线程既不能写入也不能读取）；
- 没有写入时，多个线程允许同时读（提高性能）。

```java
public class Counter {
    private final ReadWriteLock rwlock = new ReentrantReadWriteLock(); // 创建读写锁 实例
    private final Lock rlock = rwlock.readLock(); // 读锁
    private final Lock wlock = rwlock.writeLock(); // 写锁
    private int[] counts = new int[10];

    public void inc(int index) {
        wlock.lock(); // 加写锁
        try {
            counts[index] += 1;
        } finally {
            wlock.unlock(); // 释放写锁
        }
    }

    public int[] get() {
        rlock.lock(); // 加读锁
        try {
            return Arrays.copyOf(counts, counts.length);
        } finally {
            rlock.unlock(); // 释放读锁
        }
    }
}
```

使用`ReadWriteLock`可以提高读取效率：

- `ReadWriteLock`只允许一个线程写入；
- `ReadWriteLock`允许多个线程在没有写入时同时读取；
- `ReadWriteLock`适合读多写少的场景。

> 有读锁的时候，不能写，可以同时存在多个读锁。
>
> 有写锁的时候，有且仅有一个写锁，且没有其他读锁。
>
> 读锁可以共存，写锁不能和其他任何共存（写锁不能在读的时候写）

### 使用StampedLock

1. Java 8引入了新的读写锁：`StampedLock`。`StampedLock`和`ReadWriteLock`相比，改进之处在于：读的过程中也允许获取写锁后写入！这样一来，我们读的数据就可能不一致，所以，需要一点额外的代码来判断读的过程中是否有写入，这种读锁是一种乐观锁。
2. 悲观锁则是读的过程中拒绝有写入，也就是写入必须等待。显然乐观锁的并发效率更高，但一旦有小概率的写入导致读取的数据不一致，需要能检测出来，再读一遍就行。

```java
public class Point {
    private final StampedLock stampedLock = new StampedLock();

    private double x;
    private double y;

    public void move(double deltaX, double deltaY) {
        long stamp = stampedLock.writeLock(); // 获取写锁
        try {
            x += deltaX;
            y += deltaY;
        } finally {
            stampedLock.unlockWrite(stamp); // 释放写锁
        }
    }

    public double distanceFromOrigin() {
        long stamp = stampedLock.tryOptimisticRead(); // 获得一个乐观读锁
        // 注意下面两行代码不是原子操作
        // 假设x,y = (100,200)
        double currentX = x;
        // 此处已读取到x=100，但x,y可能被写线程修改为(300,400)
        double currentY = y;
        // 此处已读取到y，如果没有写入，读取是正确的(100,200)
        // 如果有写入，读取是错误的(100,400)
        if (!stampedLock.validate(stamp)) { // 检查乐观读锁后是否有其他写锁发生
            stamp = stampedLock.readLock(); // 获取一个悲观读锁
            try {
                currentX = x;
                currentY = y;
            } finally {
                stampedLock.unlockRead(stamp); // 释放悲观读锁
            }
        }
        return Math.sqrt(currentX * currentX + currentY * currentY);
    }
}
```

和`ReadWriteLock`相比，写入的加锁是完全一样的，不同的是读取。注意到首先我们通过`tryOptimisticRead()`获取一个乐观读锁，并返回版本号。接着进行读取，==读取完成后，我们通过`validate()`去验证版本号，如果在读取过程中没有写入，版本号不变，验证成功==，我们就可以放心地继续后续操作。如果在读取过程中有写入，版本号会发生变化，验证将失败。在失败的时候，我们再通过获取悲观读锁再次读取。由于写入的概率不高，程序在绝大部分情况下可以通过乐观读锁获取数据，极少数情况下使用悲观读锁获取数据。

`StampedLock`是不可重入锁。

### 使用Concurrent集合

因为所有的同步和加锁的逻辑都在集合内部实现，对外部调用者来说，只需要正常按接口引用，其他代码和原来的非线程安全代码完全一样。

```java

Map<String, String> map = new HashMap<>();

Map<String, String> map = new ConcurrentHashMap<>();

// java.util.Collections工具类还提供了一个旧的线程安全集合转换器，可以这么用：
Map unsafeMap = new HashMap();
Map threadSafeMap = Collections.synchronizedMap(unsafeMap); // 转换不安全集合 -> 安全集合
// 尽量使用Java标准库提供的并发集合，避免自己编写同步代码。
```

### 使用Atomic（）

使用`java.util.concurrent.atomic`提供的原子操作可以简化多线程编程：

- 原子操作实现了无锁的线程安全；
- 适用于计数器，累加器等。

### 使用线程池

创建线程需要操作系统资源（线程资源，栈空间等），频繁创建和销毁大量线程需要消耗大量时间。

简单地说，线程池内部维护了若干个线程，没有任务的时候，这些线程都处于等待状态。如果有新任务，就分配一个空闲线程执行。如果所有线程都处于忙碌状态，新任务要么放入队列等待，要么增加一个新线程进行处理。

使用`shutdown()`方法关闭线程池的时候，它会等待正在执行的任务先完成，然后再关闭。`shutdownNow()`会立刻停止正在执行的任务，`awaitTermination()`则会等待指定的时间让线程池关闭。

放入`ScheduledThreadPool`的任务可以定期反复执行。

```java
// 1秒后执行一次性任务:
ses.schedule(new Task("one-time"), 1, TimeUnit.SECONDS);
// 2秒后开始执行定时任务，每3秒执行:
ses.scheduleAtFixedRate(new Task("fixed-rate"), 2, 3, TimeUnit.SECONDS);
// 2秒后开始执行定时任务，以3秒为间隔执行:
ses.scheduleWithFixedDelay(new Task("fixed-delay"), 2, 3, TimeUnit.SECONDS);
```

小总结：

JDK提供了`ExecutorService`实现了线程池功能：

- 线程池内部维护一组线程，可以高效执行大量小任务；
- `Executors`提供了静态方法创建不同类型的`ExecutorService`；
- 必须调用`shutdown()`关闭`ExecutorService`；
- `ScheduledThreadPool`可以定期调度多个任务。

### 使用Future

Java标准库还提供了一个`Callable`接口，和`Runnable`接口比，它多了一个返回值：

仔细看`ExecutorService.submit()`方法，可以看到，它返回了一个`Future`类型，一个`Future`类型的实例代表一个未来能获取结果的对象：

```java
ExecutorService executor = Executors.newFixedThreadPool(4); 
// 定义任务:
Callable<String> task = new Task();
// 提交任务并获得Future:
Future<String> future = executor.submit(task);
// 从Future获取异步执行返回的结果:
String result = future.get(); // 可能阻塞
// 如果异步任务还没有完成，那么get()会阻塞，直到任务完成后才返回结果。
```

一个`Future<V>`接口表示一个未来可能会返回的结果，它定义的方法有：

- `get()`：获取结果（可能会等待）
- `get(long timeout, TimeUnit unit)`：获取结果，但只等待指定的时间；
- `cancel(boolean mayInterruptIfRunning)`：取消当前任务；
- `isDone()`：判断任务是否已完成。

### 使用CompletableFuture

从Java 8开始引入了`CompletableFuture`，它针对`Future`做了改进，可以传入回调对象，当异步任务完成或者发生异常时，自动调用回调对象的回调方法。

```java
public class Main {
    public static void main(String[] args) throws Exception {
        // 第一个任务:
        CompletableFuture<String> cfQuery = CompletableFuture.supplyAsync(() -> {
            return queryCode("中国石油"); // 返回计算结果
        });
        // cfQuery成功后继续执行下一个任务:
        CompletableFuture<Double> cfFetch = cfQuery.thenApplyAsync((code) -> {
            return fetchPrice(code);
        });
        // cfFetch成功后打印结果:
        cfFetch.thenAccept((result) -> {
            System.out.println("price: " + result);
        });
        // 主线程不要立刻结束，否则CompletableFuture默认使用的线程池会立刻关闭:
        Thread.sleep(2000); // 延长主线程 生命周期
    }

    static String queryCode(String name) {
        try {
            Thread.sleep(100);
        } catch (InterruptedException e) {
        }
        return "601857";
    }

    static Double fetchPrice(String code) {
        try {
            Thread.sleep(100);
        } catch (InterruptedException e) {
        }
        return 5 + Math.random() * 20;
    }
}

```

可见`CompletableFuture`的优点是：

- 异步任务结束时，会自动回调某个对象的方法；
- 异步任务出错时，会自动回调某个对象的方法；
- 主线程设置好回调后，不再关心异步任务的执行。

> 小结
>
> `CompletableFuture`可以指定异步处理流程：
>
> - `thenAccept()`处理正常结果；
> - `exceptional()`处理异常结果；
> - `thenApplyAsync()`用于串行化另一个`CompletableFuture`；
> - `anyOf()`和`allOf()`用于并行化多个`CompletableFuture`。

### 使用ForkJoin

Java 7开始引入了一种新的Fork/Join线程池，它可以执行一种特殊的任务：把一个大任务拆成多个小任务并行执行。

Fork/Join任务的原理：判断一个任务是否足够小，如果是，直接计算，否则，就分拆成几个小任务分别计算。这个过程可以反复“裂变”成一系列小任务。

```java
class SumTask extends RecursiveTask<Long> {
    protected Long compute() {
        // “分裂”子任务:
        SumTask subtask1 = new SumTask(...);
        SumTask subtask2 = new SumTask(...);
        // invokeAll会并行运行两个子任务:
        invokeAll(subtask1, subtask2);
        // 获得子任务的结果:
        Long subresult1 = subtask1.join(); // 并行得到结果，而非串行
        Long subresult2 = subtask2.join();
        // 汇总结果:
        return subresult1 + subresult2;
    }
}
```

Fork/Join是一种基于“分治”的算法：通过分解任务，并行执行，最后合并结果得到最终结果。

`ForkJoinPool`线程池可以把一个大任务分拆成小任务并行执行，任务类必须继承自`RecursiveTask`或`RecursiveAction`。

使用Fork/Join模式可以进行并行计算以提高效率。

### 使用ThreadLocal

这种在一个线程中，横跨若干方法调用，需要传递的对象，我们通常称之为上下文（Context），它是一种状态，可以是用户身份、任务信息等。

`ThreadLocal`实例通常总是以静态字段初始化如下：

```java
static ThreadLocal<User> threadLocalUser = new ThreadLocal<>();
```

实际上，可以把`ThreadLocal`看成一个全局`Map<Thread, Object>`：每个线程获取`ThreadLocal`变量时，总是使用`Thread`自身作为key：

因此，`ThreadLocal`相当于给每个线程都开辟了一个独立的存储空间，各个线程的`ThreadLocal`关联的实例互不干扰。

最后，特别注意`ThreadLocal`一定要在`finally`中清除： `threadLocalUser.remove();`

为了保证能释放`ThreadLocal`关联的实例，我们可以通过`AutoCloseable`接口配合`try (resource) {...}`结构，让编译器自动为我们关闭。

```java
public class UserContext implements AutoCloseable {

    static final ThreadLocal<String> ctx = new ThreadLocal<>();

    public UserContext(String user) {
        ctx.set(user);
    }

    public static String currentUser() {
        return ctx.get();
    }

    @Override
    public void close() {
        ctx.remove();
    }
}

// 使用方法
try (var ctx = new UserContext("Bob")) {
    // 可任意调用UserContext.currentUser():
    String currentUser = UserContext.currentUser();
} // 在此自动调用UserContext.close()方法释放ThreadLocal关联对象
```

## Maven基础

### Maven介绍

Maven就是是专门为Java项目打造的管理和构建工具，它的主要功能有：

- 提供了一套标准化的项目结构；
- 提供了一套标准化的构建流程（编译，测试，打包，发布……）；
- 提供了一套依赖管理机制。

Maven是一个Java项目的管理和构建工具：

- Maven使用`pom.xml`定义项目内容，并使用预设的目录结构；
- 在Maven中声明一个依赖项可以自动下载并导入classpath；
- Maven使用`groupId`，`artifactId`和`version`唯一定位一个依赖。

### 依赖管理

1. Maven的第一个作用就是解决依赖管理。我们声明了自己的项目需要`abc`，Maven会自动导入`abc`的jar包，再判断出`abc`需要`xyz`，又会自动导入`xyz`的jar包，这样，最终我们的项目会依赖`abc`和`xyz`两个jar包。

2. Maven定义了几种依赖关系，分别是`compile`、`test`、`runtime`和`provided`：

| scope    | 说明                                           | 示例            |
| :------- | :--------------------------------------------- | :-------------- |
| compile  | 编译时需要用到该jar包（默认）直接放入classpath | commons-logging |
| test     | 编译Test时需要用到该jar包，正常运行时并不需要  | junit           |
| runtime  | 编译时不需要，但运行时需要用到                 | mysql           |
| provided | 编译时需要用到，但运行时由JDK或某个服务器提供  | servlet-api     |

3. Maven如何知道从何处下载所需的依赖？也就是相关的jar包？答案是Maven维护了一个中央仓库（[repo1.maven.org](https://repo1.maven.org/)），所有第三方库将自身的jar以及相关信息上传至中央仓库，Maven就可以从中央仓库把所需依赖下载到本地。

   Maven并不会每次都从中央仓库下载jar包。一个jar包一旦被下载过，就会被Maven自动缓存在本地目录（用户主目录的`.m2`目录），所以，除了第一次编译时因为下载需要时间会比较慢，后续过程因为有本地缓存，并不会重复下载相同的jar包。

4. 对于某个依赖，Maven只需要3个变量即可唯一确定某个jar包：

   - groupId：属于组织的名称，类似Java的包名；
   - artifactId：该jar包自身的名称，类似Java的类名；
   - version：该jar包的版本。

   注：只有以`-SNAPSHOT`结尾的版本号会被Maven视为开发版本，开发版本每次都会重复下载，这种SNAPSHOT版本只能用于内部私有的Maven repo，公开发布的版本不允许出现SNAPSHOT。

5. 除了可以从Maven的中央仓库下载外，还可以从Maven的镜像仓库下载。

   中国区用户可以使用阿里云提供的Maven镜像仓库。使用Maven镜像仓库需要一个配置，在用户主目录下进入`.m2`目录，创建一个`settings.xml`配置文件

   ```xml
   <settings>
       <mirrors>
           <mirror>
               <id>aliyun</id>
               <name>aliyun</name>
               <mirrorOf>central</mirrorOf>
               <!-- 国内推荐阿里云的Maven镜像 -->
               <url>https://maven.aliyun.com/repository/central</url>
           </mirror>
       </mirrors>
   </settings>
   ```

### 构建流程

Maven的生命周期由一系列阶段（phase）构成，以内置的生命周期`default`为例，它包含以下phase：

- validate
- initialize
- generate-sources
- process-sources
- generate-resources
- process-resources
- compile
- process-classes
- generate-test-sources
- process-test-sources
- generate-test-resources
- process-test-resources
- test-compile
- process-test-classes
- test
- prepare-package
- package
- pre-integration-test
- integration-test
- post-integration-test
- verify
- install
- deploy

如果我们运行`mvn package`，Maven就会执行`default`生命周期，它会从开始一直运行到`package`这个phase为止。

所以，我们使用`mvn`这个命令时，后面的参数是phase，Maven自动根据生命周期运行到指定的phase。

在实际开发过程中，经常使用的命令有：

`mvn clean`：清理所有生成的class和jar；

`mvn clean compile`：先清理，再执行到`compile`；

`mvn clean test`：先清理，再执行到`test`，因为执行`test`前必须执行`compile`，所以这里不必指定`compile`；

`mvn clean package`：先清理，再执行到`package`。

大多数phase在执行过程中，因为我们通常没有在`pom.xml`中配置相关的设置，所以这些phase什么事情都不做。

关于goal，其实我们类比一下就明白了：

- lifecycle相当于Java的package，它包含一个或多个phase；
- phase相当于Java的class，它包含一个或多个goal；
- goal相当于class的method，它其实才是真正干活的。

大多数情况，我们只要指定phase，就默认执行这些phase默认绑定的goal，只有少数情况，我们可以直接指定运行一个goal，例如，启动Tomcat服务器：`mvn tomcat:run`

### 使用插件

1. 使用Maven构建项目就是执行lifecycle，执行到指定的phase为止。每个phase会执行自己默认的一个或多个goal。goal是最小任务单元。

2. Maven将执行`compile`这个phase，这个phase会调用`compiler`插件执行关联的`compiler:compile`这个goal。

   实际上，执行每个phase，都是通过某个插件（plugin）来执行的，Maven本身其实并不知道如何执行`compile`，它只是负责找到对应的`compiler`插件，然后执行默认的`compiler:compile`这个goal来完成编译。

   所以，使用Maven，实际上就是配置好需要使用的插件，然后通过phase调用它们。

3. 如果标准插件无法满足需求，我们还可以使用自定义插件。使用自定义插件的时候，需要声明。

### 模块管理

注意到parent的`<packaging>`是`pom`而不是`jar`，因为`parent`本身不含任何Java代码。编写`parent`的`pom.xml`只是为了在各个模块中减少重复的配置。

### 使用mvnw

简单地说，Maven Wrapper就是给一个项目提供一个独立的，指定版本的Maven给它使用。

安装Maven Wrapper最简单的方式是在项目的根目录（即`pom.xml`所在的目录）下运行安装命令：`mvn -N io.takari:maven:0.7.6:wrapper`

### 发布Artifact（）



## 网络编程

### 网络编程基础

1. IP地址又分为公网IP地址和内网IP地址。公网IP地址可以直接被访问，内网IP地址只能在内网访问。内网IP地址类似于：

   - 192.168.x.x
   - 10.x.x.x

   有一个特殊的IP地址，称之为本机地址，它总是`127.0.0.1`。

2. 如果一台计算机有两块网卡，那么除了本机地址，它可以有两个IP地址，可以分别接入两个网络。通常连接两个网络的设备是路由器或者交换机，它至少有两个IP地址，分别接入不同的网络，让网络之间连接起来。

3. 用`nslookup`可以查看域名对应的IP地址。

4. IP协议是一个分组交换，它不保证可靠传输。而TCP协议是传输控制协议，它是面向连接的协议，支持可靠传输和双向通信。TCP协议是建立在IP协议之上的，简单地说，IP协议只负责发数据包，不保证顺序和正确性，而TCP协议负责控制数据包传输，它在传输数据之前需要先建立连接，建立连接后才能传输数据，传输完后还需要断开连接。TCP协议之所以能保证数据的可靠传输，是通过接收确认、超时重传这些机制实现的。并且，TCP协议允许双向通信，即通信双方可以同时发送和接收数据。

### TCP编程（）

1. Socket是一个抽象概念，一个应用程序通过一个Socket来建立一个远程连接，而Socket内部通过TCP/IP协议把数据传输到网络：
2. 一个Socket就是由IP地址和端口号（范围是0～65535）组成，可以把Socket简单理解为IP地址加端口号。端口号总是由操作系统分配，它是一个0～65535之间的数字，其中，小于1024的端口属于*特权端口*，需要管理员权限，大于1024的端口可以由任意用户的应用程序打开。
   - 对服务器端来说，它的Socket是指定的IP地址和指定的端口号；
   - 对客户端来说，它的Socket是它所在计算机的IP地址和一个由操作系统分配的随机端口号。

> 使用Java进行TCP编程时，需要使用Socket模型：
>
> - 服务器端用`ServerSocket`监听指定端口；（暴露IP:port给客户服务用）
> - 客户端使用`Socket(InetAddress, port)`连接服务器；
> - 服务器端用`accept()`接收连接并返回`Socket`；
> - 双方通过`Socket`打开`InputStream`/`OutputStream`读写数据；
> - 服务器端通常使用多线程同时处理多个客户端连接，利用线程池可大幅提升效率；
> - `flush()`用于强制输出缓冲区到网络。

### UDP编程

使用UDP协议通信时，服务器和客户端双方无需建立连接：

- 服务器端用`DatagramSocket(port)`监听端口；
- 客户端使用`DatagramSocket.connect()`指定远程地址和端口；
- 双方通过`receive()`和`send()`读写数据；
- `DatagramSocket`没有IO流接口，数据被直接写入`byte[]`缓冲区。

```java
// 服务器
DatagramSocket ds = new DatagramSocket(6666); // 监听指定端口
for (;;) { // 无限循环
    // 数据缓冲区:
    byte[] buffer = new byte[1024];
    DatagramPacket packet = new DatagramPacket(buffer, buffer.length);
    ds.receive(packet); // 收取一个UDP数据包
    // 收取到的数据存储在buffer中，由packet.getOffset(), packet.getLength()指定起始位置和长度
    // 将其按UTF-8编码转换为String:
    String s = new String(packet.getData(), packet.getOffset(), packet.getLength(), StandardCharsets.UTF_8);
    // 发送数据:
    byte[] data = "ACK".getBytes(StandardCharsets.UTF_8);
    packet.setData(data);
    ds.send(packet);
}

// 客户端
DatagramSocket ds = new DatagramSocket();
ds.setSoTimeout(1000);
ds.connect(InetAddress.getByName("localhost"), 6666); // 连接指定服务器和端口
// 发送:
byte[] data = "Hello".getBytes();
DatagramPacket packet = new DatagramPacket(data, data.length);
ds.send(packet);
// 接收:
byte[] buffer = new byte[1024];
packet = new DatagramPacket(buffer, buffer.length);
ds.receive(packet);
String resp = new String(packet.getData(), packet.getOffset(), packet.getLength());
ds.disconnect();
```

### 发送Email（）

1. 电子邮件是从用户电脑的邮件软件，例如Outlook，发送到邮件服务器上，可能经过若干个邮件服务器的中转，最终到达对方邮件服务器上，收件方就可以用软件接收邮件

2. 我们把类似Outlook这样的邮件软件称为MUA：Mail User Agent，意思是给用户服务的邮件代理；邮件服务器则称为MTA：Mail Transfer Agent，意思是邮件中转的代理；最终到达的邮件服务器称为MDA：Mail Delivery Agent，意思是邮件到达的代理。电子邮件一旦到达MDA，就不再动了。实际上，电子邮件通常就存储在MDA服务器的硬盘上，然后等收件人通过软件或者登陆浏览器查看邮件。

3. 常用邮件服务商的SMTP信息：

   - QQ邮箱：SMTP服务器是smtp.qq.com，端口是465/587；
   - 163邮箱：SMTP服务器是smtp.163.com，端口是465；
   - Gmail邮箱：SMTP服务器是smtp.gmail.com，端口是465/587。

4. 首先，我们需要创建一个Maven工程，并把JavaMail相关的两个依赖加入进来：

   ```xml
   <dependencies>
       <dependency>
           <groupId>javax.mail</groupId>
           <artifactId>javax.mail-api</artifactId>
           <version>1.6.2</version>
       </dependency>
       <dependency>
           <groupId>com.sun.mail</groupId>
           <artifactId>javax.mail</artifactId>
           <version>1.6.2</version>
       </dependency>
   ```

   ```java
   // 服务器地址:
   String smtp = "smtp.office365.com";
   // 登录用户名:
   String username = "jxsmtp101@outlook.com";
   // 登录口令:
   String password = "********";
   // 连接到SMTP服务器587端口:
   Properties props = new Properties();
   props.put("mail.smtp.host", smtp); // SMTP主机名
   props.put("mail.smtp.port", "587"); // 主机端口号
   props.put("mail.smtp.auth", "true"); // 是否需要用户认证
   props.put("mail.smtp.starttls.enable", "true"); // 启用TLS加密
   // 获取Session实例:
   Session session = Session.getInstance(props, new Authenticator() {
       protected PasswordAuthentication getPasswordAuthentication() {
           return new PasswordAuthentication(username, password);
       }
   });
   // 设置debug模式便于调试:
   session.setDebug(true);
   ```

   ```java
   MimeMessage message = new MimeMessage(session);
   // 设置发送方地址:
   message.setFrom(new InternetAddress("me@example.com"));
   // 设置接收方地址:
   message.setRecipient(Message.RecipientType.TO, new InternetAddress("xiaoming@somewhere.com"));
   // 设置邮件主题:
   message.setSubject("Hello", "UTF-8");
   // 设置邮件正文:
   message.setText("Hi Xiaoming...", "UTF-8");
   // html邮件 message.setText(body, "UTF-8", "html");
   // 发送:
   Transport.send(message);
   ```

5. 发送附件：。。。

6. 发送内嵌图片的HTML邮件。。。

### 接收Email（略）



### HTTP编程

详情：[HTTP编程 - 廖雪峰的官方网站 (liaoxuefeng.com)](https://www.liaoxuefeng.com/wiki/1252599548343744/1319099982413858)

1. HTTP是HyperText Transfer Protocol的缩写，翻译为超文本传输协议，它是基于TCP协议之上的一种请求-响应协议。 

2. 当浏览器希望访问某个网站时，浏览器和网站服务器之间首先建立TCP连接，且服务器总是使用`80`端口和加密端口`443`，然后，浏览器向服务器发送一个HTTP请求，服务器收到后，返回一个HTTP响应，并且在响应中包含了HTML的网页内容，这样，浏览器解析HTML后就可以给用户显示网页了。（==也就是先TCP三次握手建立连接通道，然后客户端向服务器发送HTTP请求，得到服务器响应，最后TCP四次挥手断开连接/关闭连接通道==）

3. > 1. HTTP请求的格式是固定的，它由HTTP Header和HTTP Body两部分构成。第一行总是`请求方法 路径 HTTP版本`，例如，`GET / HTTP/1.1`表示使用`GET`请求，路径是`/`，版本是`HTTP/1.1`。
   >
   > 2. 后续的每一行都是固定的`Header: Value`格式，我们称为HTTP Header，服务器依靠某些特定的Header来识别客户端请求，例如：
   >
   >    - Host：表示请求的域名，因为一台服务器上可能有多个网站，因此有必要依靠Host来识别请求是发给哪个网站的；
   >
   >    - User-Agent：表示客户端自身标识信息，不同的浏览器有不同的标识，服务器依靠User-Agent判断客户端类型是IE还是Chrome，是Firefox还是一个Python爬虫；
   >    - Accept：表示客户端能处理的HTTP响应格式，`*/*`表示任意格式，`text/*`表示任意文本，`image/png`表示PNG格式的图片；
   >    - Accept-Language：表示客户端接收的语言，多种语言按优先级排序，服务器依靠该字段给用户返回特定语言的网页版本。
   >
   > 3. 如果是`GET`请求，那么该HTTP请求只有HTTP Header，没有HTTP Body。如果是`POST`请求，那么该HTTP请求带有Body，以一个空行分隔。
   >
   > 4. `POST`请求通常要设置`Content-Type`表示Body的类型，`Content-Length`表示Body的长度，这样服务器就可以根据请求的Header和Body做出正确的响应。

4. 使用Java进行HTTP客户端编程仅限于获得响应内容，Java标准库提供了基于HTTP的包，但是要注意，早期的JDK版本是通过`HttpURLConnection`访问HTTP，典型代码如下：

   ```java
   URL url = new URL("http://www.example.com/path/to/target?a=1&b=2");
   HttpURLConnection conn = (HttpURLConnection) url.openConnection();
   conn.setRequestMethod("GET");
   conn.setUseCaches(false);
   conn.setConnectTimeout(5000); // 请求超时5秒
   // 设置HTTP头:
   conn.setRequestProperty("Accept", "*/*");
   conn.setRequestProperty("User-Agent", "Mozilla/5.0 (compatible; MSIE 11; Windows NT 5.1)");
   // 连接并发送HTTP请求:
   conn.connect();
   // 判断HTTP响应是否200:
   if (conn.getResponseCode() != 200) {
       throw new RuntimeException("bad response");
   }		
   // 获取所有响应Header:
   Map<String, List<String>> map = conn.getHeaderFields();
   for (String key : map.keySet()) {
       System.out.println(key + ": " + map.get(key));
   }
   // 获取响应内容:
   InputStream input = conn.getInputStream();
   ```

   从Java 11开始，引入了新的`HttpClient`，它使用链式调用的API，能大大简化HTTP的处理。

   我们来看一下如何使用新版的`HttpClient`。首先需要创建一个全局`HttpClient`实例，因为`HttpClient`内部使用线程池优化多个HTTP连接，可以复用

   ```java
   // Get请求
   import java.net.URI;
   import java.net.http.*;
   import java.net.http.HttpClient.Version;
   import java.time.Duration;
   import java.util.*;
   
   public class Main {
       // 全局HttpClient:
       static HttpClient httpClient = HttpClient.newBuilder().build();
   
       public static void main(String[] args) throws Exception {
           String url = "https://www.sina.com.cn/";
           HttpRequest request = HttpRequest.newBuilder(new URI(url))
               // 设置Header:
               .header("User-Agent", "Java HttpClient").header("Accept", "*/*")
               // 设置超时:
               .timeout(Duration.ofSeconds(5))
               // 设置版本:
               .version(Version.HTTP_2).build();
               // 使用POST并设置Body:
   		   // .POST(BodyPublishers.ofString(body, StandardCharsets.UTF_8)).build();
           HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
           // HTTP允许重复的Header，因此一个Header可对应多个Value:
           Map<String, List<String>> headers = response.headers().map();
           for (String header : headers.keySet()) {
               System.out.println(header + ": " + headers.get(header).get(0));
           }
           System.out.println(response.body().substring(0, 1024) + "...");
       }
   }
   ```

### RMI远程调用（）

Java的RMI远程调用是指，一个JVM中的代码可以通过网络实现远程调用另一个JVM的某个方法。RMI是Remote Method Invocation的缩写。

要实现RMI，服务器和客户端必须共享同一个接口。Java的RMI规定此接口必须派生自`java.rmi.Remote`，并在每个方法声明抛出`RemoteException`。

```java
// 服务器端
public class Server {
    public static void main(String[] args) throws RemoteException {
        System.out.println("create World clock remote service...");
        // 实例化一个WorldClock:
        WorldClock worldClock = new WorldClockService();
        // 将此服务转换为远程服务接口:
        WorldClock skeleton = (WorldClock) UnicastRemoteObject.exportObject(worldClock, 0);
        // 将RMI服务注册到1099端口:
        Registry registry = LocateRegistry.createRegistry(1099);
        // 注册此服务，服务名为"WorldClock":
        registry.rebind("WorldClock", skeleton);
    }
}
// 上述代码主要目的是通过RMI提供的相关类，将我们自己的WorldClock实例注册到RMI服务上。RMI的默认端口是1099，最后一步注册服务时通过rebind()指定服务名称为"WorldClock"。

// 客户端
public class Client {
    public static void main(String[] args) throws RemoteException, NotBoundException {
        // 连接到服务器localhost，端口1099:
        Registry registry = LocateRegistry.getRegistry("localhost", 1099);
        // 查找名称为"WorldClock"的服务并强制转型为WorldClock接口:
        WorldClock worldClock = (WorldClock) registry.lookup("WorldClock");
        // 正常调用接口方法:
        LocalDateTime now = worldClock.getLocalDateTime("Asia/Shanghai");
        // 打印调用结果:
        System.out.println(now);
    }
}
```

## XML与JSON

如何使用Java 读写 XML和JSON

### XML简介

1. XML是可扩展标记语言（eXtensible Markup Language）的缩写，它是是一种数据表示格式，可以描述非常复杂的数据结构，常用于传输和存储数据。
2. XML有几个特点：一是纯文本，默认使用UTF-8编码，二是可嵌套，适合表示结构化数据。如果把XML内容存为文件，那么它就是一个XML文件，例如`book.xml`。此外，XML内容经常通过网络作为消息传输。（XML常用于配置文件、网络消息传输等。）
3. 如何验证XML文件的正确性呢？最简单的方式是通过浏览器验证。可以直接把XML文件拖拽到浏览器窗口，如果格式错误，浏览器会报错。
4. XML是一个技术体系，除了我们经常用到的XML文档本身外，XML还支持：
   - DTD和XSD：验证XML结构和数据是否有效；
   - Namespace：XML节点和属性的名字空间；
   - XSLT：把XML转化为另一种文本；
   - XPath：一种XML节点查询语言；

### 使用DOM

```java
InputStream input = Main.class.getResourceAsStream("/book.xml");
DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
DocumentBuilder db = dbf.newDocumentBuilder();
Document doc = db.parse(input);
```

1. Java提供的DOM API可以将XML解析为DOM结构，以Document对象表示；
2. DOM可在内存中完整表示XML数据结构；
3. DOM解析速度慢，内存占用大。

### 使用SAX

SAX是Simple API for XML的缩写，它是一种基于流的解析方式，边读取XML边解析，并以事件回调的方式让调用者获取数据。因为是一边读一边解析，所以无论XML有多大，占用的内存都很小。

SAX解析会触发一系列事件：

- startDocument：开始读取XML文档；
- startElement：读取到了一个元素，例如`<book>`；
- characters：读取到了字符；
- endElement：读取到了一个结束的元素，例如`</book>`；
- endDocument：读取XML文档结束。

```java
InputStream input = Main.class.getResourceAsStream("/book.xml");
SAXParserFactory spf = SAXParserFactory.newInstance();
SAXParser saxParser = spf.newSAXParser();
saxParser.parse(input, new MyHandler());

//////////////////
class MyHandler extends DefaultHandler {
    public void startDocument() throws SAXException {
        print("start document");
    }

    public void endDocument() throws SAXException {
        print("end document");
    }

    public void startElement(String uri, String localName, String qName, Attributes attributes) throws SAXException {
        print("start element:", localName, qName);
    }

    public void endElement(String uri, String localName, String qName) throws SAXException {
        print("end element:", localName, qName);
    }

    public void characters(char[] ch, int start, int length) throws SAXException {
        print("characters:", new String(ch, start, length));
    }

    public void error(SAXParseException e) throws SAXException {
        print("error:", e);
    }

    void print(Object... objs) {
        for (Object obj : objs) {
            System.out.print(obj);
            System.out.print(" ");
        }
        System.out.println();
    }
}
```

### 使用Jackson

一个名叫Jackson的开源的第三方库可以轻松做到XML到JavaBean的转换。我们要使用Jackson，先添加两个Maven的依赖：

- com.fasterxml.jackson.dataformat:jackson-dataformat-xml:2.10.1
- org.codehaus.woodstox:woodstox-core-asl:4.4.1

```java
InputStream input = Main.class.getResourceAsStream("/book.xml");
JacksonXmlModule module = new JacksonXmlModule();
XmlMapper mapper = new XmlMapper(module);
Book book = mapper.readValue(input, Book.class);
System.out.println(book.id);
System.out.println(book.name);
System.out.println(book.author);
System.out.println(book.isbn);
System.out.println(book.tags);
System.out.println(book.pubDate);
```

### 使用JSON（）

JSON是JavaScript Object Notation的缩写，

```js
// 浏览器直接支持使用JavaScript对JSON进行读写：
// JSON string to JavaScript object:
jsObj = JSON.parse(jsonStr);

// JavaScript object to JSON string:
jsonStr = JSON.stringify(jsObj);
```

jackson

```java
InputStream input = Main.class.getResourceAsStream("/book.json");
ObjectMapper mapper = new ObjectMapper();
// 反序列化时忽略不存在的JavaBean属性:
mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
Book book = mapper.readValue(input, Book.class);

// 反序列化
String json = mapper.writeValueAsString(book);
```

## JDBC编程

### JDBC简介