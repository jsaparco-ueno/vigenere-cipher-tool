import React, { Component } from 'react';

export class VigenereCipherTool extends Component {
    constructor(props) {
        super(props);
        this.state = { targetText: '', codeword: '' };
    }

    componentDidMount() {

    }

    handleDecrypt(event) {
        event.preventDefault();

        const targetText = event.target.TargetText.value;
        const codeWord = event.target.CodeWord.value;
        document.getElementById('DestinationText').value = this.decryptText(targetText.toLowerCase(), codeWord.toLowerCase());
    }

    decryptText(targetText, codeWord) {
        var resultArray = [];
        var targetTextArray = targetText.split('');
        var codeLettersArray = this.assignCodeLetters(targetText, codeWord);
        resultArray = targetTextArray.map((c,i) => this.decryptChar(c, codeLettersArray[i]));
        return resultArray.join('');
    }

    assignCodeLetters(targetText, codeWord) {
        var codeLettersArray = [];
        var i=0;
        var ci=0;

        for (i=0, ci=0; i<=targetText.length; i++) {
            var targetChar = targetText.charCodeAt(i);
            if (targetChar < 97 || targetChar > 122) {
                codeLettersArray[i] = '';
            }
            else {
                codeLettersArray[i] = codeWord[ci++%(codeWord.length)]    
            }
        }
        return codeLettersArray;
    }

    decryptChar(c, codeLetter) {
        //get the letter from the keyword at index i
        //subtract the code letter's value from c to get the decrypted letter
        const targetCharCode = c.charCodeAt(0);
        if (targetCharCode < 97 || targetCharCode > 122) return c; //don't decrypt anything that isn't a-z
        const shift = codeLetter.charCodeAt(0)-97;

        var decryptedCode = targetCharCode - shift;
        if (targetCharCode - shift < 97) {
            decryptedCode += 26 //"wrap" the code inside the range of a-z
        }
        return String.fromCharCode(decryptedCode);
    }

    render() {
        return (
            <form name='cipher-form' className='form' onSubmit={(e) => this.handleDecrypt(e) } >
                <input className='form-control' type='text' name='TargetText' placeholder='Enter text to decrypt' required />
                <input className='form-control' type='text' name='DestinationText' id='DestinationText' placeholder='Results will appear here.' disabled />
                <input className='form-control' type='text' name='CodeWord' placeholder='Code Word' required />
                <button type='submit' className='btn btn-primary'>Decrypt</button>
            </form>
        )
    }
}