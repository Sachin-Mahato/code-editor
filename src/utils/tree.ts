const uniqueId = (() => {
  function* uniqueIdGenerator() {
    let id = Date.now();
    
    while(true) {
      yield id++;
    }
  }
  
  const gen = uniqueIdGenerator();
  
  return () => gen.next().value;
})()

class Tree {
  #children = new Map();
  #parent: Tree | null = null;
  #id = uniqueId();
  #name;
  
  constructor(name: string) {
    if(!name || typeof name !== 'string' || !name.trim().length) {
      throw new Error('Name must be a non-empty String');
    }
    
    this.#name = name;
  }

  get name() {
    return this.#name;
  }
  
  set name(newName) {
    if(!newName || typeof newName !== 'string' || !newName.trim().length) {
      throw new Error('Cannot change name.Name must be a non-empty String');
    }
    
    this.#name = newName;
  }

  get identifier() {
    return this.#id;
  }

  get children() {
    return Array.from(this.#children.values());
  }

  get parentNode() {
    return this.#parent;
  }

  set parentNode(newParent: Tree | null) {
    if(newParent !== this.parentNode && (newParent === null || newParent instanceof Tree)) {
      if(this.#parent) {
         this.#parent?.removeChildNode(this);
      }
      
      this.#parent = newParent;
      
      if(newParent) {
        newParent?.appendChildNode(this);
      }
    }
  }

  get childrenCount() {
    return this.#children.size;
  }

  createChildNode(name: string): Tree {
    const newNode = new Tree(name);
    this.#children.set(newNode.identifier, newNode);
    newNode.parentNode = this as Tree | null;
    
    return newNode;
  }

  hasChildNode(needle: Tree | string | number): boolean {
    if(needle instanceof Tree) {
      return this.#children.has(needle.identifier);
    }
    
    for(const child of this.children) {
      if(child.name === needle || this.identifier === needle) {
        return true
      }
    }
    
    return false;
  }

  getChildNode(nameOrId: string | number): Tree | null {
    for(const child of this.children) {
      if(child.name === nameOrId || this.identifier === nameOrId) {
        return child;
      }
    }
    
    return null;
  }


  removeChildNode(needle: Tree | string | number): void {
    if(!this.hasChildNode(needle)) return;
    
    let removedNode;
    
    if(needle instanceof Tree) {
      this.#children.delete(needle.identifier);
      removedNode = needle;
    } else {
      for(const child of this.children) {
        if(child.name === needle || child.identifier === needle) {
          this.#children.delete(child.identifier);
          removedNode = child;
          break;
        }
      }
    }
    
    if(removedNode) {
      removedNode.parentNode = null;
    }
  }

  appendChildNode(node: Tree): void {
    if(!(node instanceof Tree) || this.hasChildNode(node)) return;
    
    if(node === this) throw new Error('Node cannot contain itself');
    
    let parent = this.parentNode;
    while(parent !== null) {
      if(parent === node) throw new Error('Node cannot contain one of its ancestors');
      parent = parent?.parentNode as Tree | null;
    }
    
    this.#children.set(node.identifier, node);
    node.parentNode = this as Tree | null;
  }

  #getTreeString = (node: Tree, spaceCount: number = 0): string => {
    let str = "\n";
  
    node.children.forEach((child: Tree) => {
      str += `${" ".repeat(spaceCount)}${child.name}${this.#getTreeString(child, spaceCount + 2)}`
    })

    return str;
  }

  print() {
    console.log(`\n${this.name}${this.#getTreeString(this, 2)}`);
  }

  traverse(cb: (node: Tree) => boolean | void): boolean | void {
    for(const child of this.children) {
      if(cb(child) === true || child.traverse(cb) === true) {
        return true;
      }
    }
  }

  findNodeByName(name: string): Tree | null {
    let foundNode = null;
    
    this.traverse((node: Tree) => {
      if(node.name === name) {
        foundNode = node;
        return true;
      }
    })
    
    return foundNode;
  }

  findAllNodesByName(name: string): Tree[] {
    const children: Tree[] = [];
    
    this.traverse(node => {
      if(node.name === name ) {
        children.push(node);
      }
    })
    
    return children as Tree[];
  }
}

export default Tree;